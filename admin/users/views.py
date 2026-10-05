import json
import uuid
import bcrypt
from django.db import connection, transaction, IntegrityError
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from backoffice.permissions import IsAdminRole


STAFF_ROLES = {
    'SUPER_ADMIN',
    'LOAN_OFFICER',
    'ACCOUNTANT',
    'COMPLIANCE_OFFICER',
}


class StaffManagementMixin:
    """
    Shared functionality for staff management views.

    The users table is owned by Prisma/NestJS, so Django accesses it
    directly using raw SQL.

    Audit records are stored in the Prisma audit_logs table.
    """

    def _get_staff(self, staff_id):
        """
        Retrieve a single non-borrower staff member.
        """

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    name,
                    address,
                    occupation,
                    phone,
                    email,
                    role,
                    kyc_status,
                    created_at,
                    updated_at,
                    deleted_at,
                    avatar_url
                FROM users
                WHERE id = %s
                  AND role <> 'BORROWER'
                LIMIT 1
                """,
                [str(staff_id)],
            )

            row = cursor.fetchone()

        if not row:
            return None

        columns = [
            'id',
            'name',
            'address',
            'occupation',
            'phone',
            'email',
            'role',
            'kyc_status',
            'created_at',
            'updated_at',
            'deleted_at',
            'avatar_url',
        ]

        return dict(zip(columns, row))

    def _serialize_staff(self, staff):
        """
        Convert a database staff record into API-safe JSON.
        """

        return {
            'id': str(staff['id']),
            'name': staff['name'],
            'address': staff['address'],
            'occupation': staff['occupation'],
            'phone': staff['phone'],
            'email': staff['email'],
            'role': str(staff['role']),
            'kyc_status': str(staff['kyc_status']),
            'created_at': (
                staff['created_at'].isoformat()
                if staff['created_at']
                else None
            ),
            'updated_at': (
                staff['updated_at'].isoformat()
                if staff['updated_at']
                else None
            ),
            'deleted_at': (
                staff['deleted_at'].isoformat()
                if staff['deleted_at']
                else None
            ),
            'avatar_url': staff['avatar_url'],
            'is_active': staff['deleted_at'] is None,
        }

    def _write_audit_log(
        self,
        request,
        actor_id,
        action,
        entity_id,
        before_state=None,
        after_state=None,
    ):
        """
        Write an immutable audit record.

        audit_logs schema:

            id
            actor_id
            action
            entity_type
            entity_id
            before_state
            after_state
            ip_address
            timestamp
        """

        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO audit_logs (
                    id,
                    actor_id,
                    action,
                    entity_type,
                    entity_id,
                    before_state,
                    after_state,
                    ip_address
                )
                VALUES (
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s::jsonb,
                    %s::jsonb,
                    %s
                )
                """,
                [
                    str(uuid.uuid4()),
                    str(actor_id),
                    action,
                    'USER',
                    str(entity_id),
                    (
                        json.dumps(before_state)
                        if before_state is not None
                        else None
                    ),
                    (
                        json.dumps(after_state)
                        if after_state is not None
                        else None
                    ),
                    request.META.get('REMOTE_ADDR'),
                ],
            )

    def _check_unique_staff_fields(self, phone, email=None, exclude_id=None):
        """
        Check phone/email uniqueness.

        Empty email values are normalized to None.

        Returns:
            'phone' if phone already exists
            'email' if email already exists
            None otherwise
        """

        conditions = []
        params = []

        if phone:
            conditions.append('phone = %s')
            params.append(phone)

        if email:
            conditions.append('email = %s')
            params.append(email)

        if not conditions:
            return None

        query = f"""
            SELECT phone, email
            FROM users
            WHERE ({' OR '.join(conditions)})
        """

        if exclude_id is not None:
            query += """
                AND id <> %s
            """
            params.append(str(exclude_id))

        query += """
            LIMIT 1
        """

        with connection.cursor() as cursor:
            cursor.execute(query, params)
            row = cursor.fetchone()

        if not row:
            return None

        existing_phone, existing_email = row

        if phone and existing_phone == phone:
            return 'phone'

        if email and existing_email == email:
            return 'email'

        return None

    def _normalize_optional_string(self, value):
        """
        Convert empty/whitespace-only strings to None.
        """

        if value is None:
            return None

        value = str(value).strip()

        return value if value else None


class StaffListCreateView(StaffManagementMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        """
        Return all staff members.

        Borrowers are excluded.

        deleted_at IS NULL
            => active

        deleted_at IS NOT NULL
            => deactivated
        """

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    name,
                    phone,
                    email,
                    role,
                    kyc_status,
                    created_at,
                    deleted_at
                FROM users
                WHERE role <> 'BORROWER'
                ORDER BY created_at DESC
                """
            )

            rows = cursor.fetchall()

        staff = []

        for row in rows:
            staff.append(
                {
                    'id': str(row[0]),
                    'name': row[1],
                    'phone': row[2],
                    'email': row[3],
                    'role': str(row[4]),
                    'kyc_status': str(row[5]),
                    'created_at': (
                        row[6].isoformat()
                        if row[6]
                        else None
                    ),
                    'deleted_at': (
                        row[7].isoformat()
                        if row[7]
                        else None
                    ),
                    'is_active': row[7] is None,
                }
            )

        return Response(
            {
                'count': len(staff),
                'data': staff,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        """
        Create a new staff member.
        """

        data = request.data

        name = self._normalize_optional_string(data.get('name'))
        phone = self._normalize_optional_string(data.get('phone'))
        password = data.get('password')
        role = self._normalize_optional_string(data.get('role'))

        email = self._normalize_optional_string(data.get('email'))
        address = self._normalize_optional_string(data.get('address'))
        occupation = self._normalize_optional_string(
            data.get('occupation')
        )

        # ---------------------------------------------------------
        # Required fields
        # ---------------------------------------------------------

        missing_fields = []

        if not name:
            missing_fields.append('name')

        if not phone:
            missing_fields.append('phone')

        if not password:
            missing_fields.append('password')

        if not role:
            missing_fields.append('role')

        if missing_fields:
            return Response(
                {
                    'message': 'Missing required fields',
                    'fields': missing_fields,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ---------------------------------------------------------
        # Validate role
        # ---------------------------------------------------------

        if role not in STAFF_ROLES:
            return Response(
                {
                    'message': 'Invalid staff role',
                    'allowed_roles': sorted(STAFF_ROLES),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ---------------------------------------------------------
        # Validate password
        # ---------------------------------------------------------

        if not isinstance(password, str) or len(password) < 8:
            return Response(
                {
                    'message': 'Password must contain at least 8 characters',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ---------------------------------------------------------
        # Check uniqueness
        # ---------------------------------------------------------

        conflict = self._check_unique_staff_fields(
            phone=phone,
            email=email,
        )

        if conflict == 'phone':
            return Response(
                {
                    'message': 'A user with this phone number already exists',
                },
                status=status.HTTP_409_CONFLICT,
            )

        if conflict == 'email':
            return Response(
                {
                    'message': 'A user with this email already exists',
                },
                status=status.HTTP_409_CONFLICT,
            )

        # ---------------------------------------------------------
        # Hash password
        # ---------------------------------------------------------

        password_hash = bcrypt.hashpw(
            password.encode('utf-8'),
            bcrypt.gensalt(),
        ).decode('utf-8')

        staff_id = str(uuid.uuid4())

        actor_id = request.user.id

        try:
            with transaction.atomic():
                with connection.cursor() as cursor:
                    cursor.execute(
                    """
                    INSERT INTO users (
                        id,
                        name,
                        address,
                        occupation,
                        phone,
                        email,
                        password_hash,
                        role,
                        kyc_status,
                        updated_at
                    )
                    VALUES (
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        %s,
                        'PENDING',
                        CURRENT_TIMESTAMP
                    )
                    """,
                    [
                        staff_id,
                        name,
                        address,
                        occupation,
                        phone,
                        email,
                        password_hash,
                        role,
                    ],
                )
                self._write_audit_log(
                    request=request,
                    actor_id=actor_id,
                    action='CREATE_STAFF',
                    entity_id=staff_id,
                    before_state=None,
                    after_state={
                        'id': staff_id,
                        'name': name,
                        'phone': phone,
                        'email': email,
                        'role': role,
                        'kyc_status': 'PENDING',
                        'address': address,
                        'occupation': occupation,
                        'status': 'ACTIVE',
                    },
                )

        except IntegrityError:
            return Response(
                {
                    'message': (
                        'Unable to create staff member. '
                        'Phone or email may already exist.'
                    ),
                },
                status=status.HTTP_409_CONFLICT,
            )

        staff = self._get_staff(staff_id)

        return Response(
            {
                'message': 'Staff member created successfully',
                'data': self._serialize_staff(staff),
            },
            status=status.HTTP_201_CREATED,
        )


class StaffDetailView(StaffManagementMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request, pk):
        """
        Return one staff member together with recent audit activity.
        """

        staff = self._get_staff(pk)

        if not staff:
            return Response(
                {
                    'message': 'Staff member not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    id,
                    actor_id,
                    action,
                    entity_type,
                    entity_id,
                    before_state,
                    after_state,
                    ip_address,
                    timestamp
                FROM audit_logs
                WHERE entity_type = 'USER'
                  AND entity_id = %s
                ORDER BY timestamp DESC
                LIMIT 20
                """,
                [str(pk)],
            )

            rows = cursor.fetchall()

        audit_logs = []

        for row in rows:
            audit_logs.append(
                {
                    'id': str(row[0]),
                    'actor_id': str(row[1]),
                    'action': row[2],
                    'entity_type': row[3],
                    'entity_id': str(row[4]),
                    'before_state': row[5],
                    'after_state': row[6],
                    'ip_address': row[7],
                    'timestamp': (
                        row[8].isoformat()
                        if row[8]
                        else None
                    ),
                }
            )

        return Response(
            {
                'data': {
                    'staff': self._serialize_staff(staff),
                    'audit_logs': audit_logs,
                },
            },
            status=status.HTTP_200_OK,
        )

    def patch(self, request, pk):
        """
        Update editable staff profile fields.

        Role and password cannot be changed here.

        Role changes have their own dedicated endpoint.
        """

        staff = self._get_staff(pk)

        if not staff:
            return Response(
                {
                    'message': 'Staff member not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        forbidden_fields = {
            'role',
            'password',
            'password_hash',
        }

        submitted_forbidden = forbidden_fields.intersection(
            request.data.keys()
        )

        if submitted_forbidden:
            return Response(
                {
                    'message': (
                        'These fields cannot be updated here: '
                        + ', '.join(sorted(submitted_forbidden))
                    ),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        allowed_fields = {
            'name',
            'email',
            'phone',
            'address',
            'occupation',
        }

        unknown_fields = set(request.data.keys()) - allowed_fields

        if unknown_fields:
            return Response(
                {
                    'message': 'Unknown fields supplied',
                    'fields': sorted(unknown_fields),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not request.data:
            return Response(
                {
                    'message': 'No fields supplied for update',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        updates = {}

        for field in allowed_fields:
            if field in request.data:
                value = self._normalize_optional_string(
                    request.data.get(field)
                )

                if field == 'name' and not value:
                    return Response(
                        {
                            'message': 'Name cannot be empty',
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                if field == 'phone' and not value:
                    return Response(
                        {
                            'message': 'Phone cannot be empty',
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                updates[field] = value

        new_phone = updates.get('phone', staff['phone'])
        new_email = updates.get('email', staff['email'])

        conflict = self._check_unique_staff_fields(
            phone=new_phone,
            email=new_email,
            exclude_id=pk,
        )

        if conflict == 'phone':
            return Response(
                {
                    'message': 'A user with this phone number already exists',
                },
                status=status.HTTP_409_CONFLICT,
            )

        if conflict == 'email':
            return Response(
                {
                    'message': 'A user with this email already exists',
                },
                status=status.HTTP_409_CONFLICT,
            )

        before_state = {
            field: staff[field]
            for field in updates
        }

        after_state = {
            field: updates[field]
            for field in updates
        }

        set_clauses = []
        params = []

        for field, value in updates.items():
            set_clauses.append(f'{field} = %s')
            params.append(value)

        set_clauses.append('updated_at = CURRENT_TIMESTAMP')

        params.append(str(pk))

        try:
            with transaction.atomic():
                with connection.cursor() as cursor:
                    cursor.execute(
                        f"""
                        UPDATE users
                        SET {', '.join(set_clauses)}
                        WHERE id = %s
                          AND role <> 'BORROWER'
                        """,
                        params,
                    )

                    if cursor.rowcount == 0:
                        return Response(
                            {
                                'message': 'Staff member not found',
                            },
                            status=status.HTTP_404_NOT_FOUND,
                        )

                self._write_audit_log(
                    request=request,
                    actor_id=request.user.id,
                    action='UPDATE_STAFF',
                    entity_id=pk,
                    before_state=before_state,
                    after_state=after_state,
                )

        except IntegrityError:
            return Response(
                {
                    'message': (
                        'Unable to update staff member. '
                        'Phone or email may already exist.'
                    ),
                },
                status=status.HTTP_409_CONFLICT,
            )

        updated_staff = self._get_staff(pk)

        return Response(
            {
                'message': 'Staff member updated successfully',
                'data': self._serialize_staff(updated_staff),
            },
            status=status.HTTP_200_OK,
        )


class ActivateStaffView(StaffManagementMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request, pk):
        """
        Reactivate a deactivated staff member.
        """

        staff = self._get_staff(pk)

        if not staff:
            return Response(
                {
                    'message': 'Staff member not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if staff['deleted_at'] is None:
            return Response(
                {
                    'message': 'Staff member is already active',
                },
                status=status.HTTP_409_CONFLICT,
            )

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE users
                    SET
                        deleted_at = NULL,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                      AND role <> 'BORROWER'
                    """,
                    [str(pk)],
                )

            self._write_audit_log(
                request=request,
                actor_id=request.user.id,
                action='ACTIVATE_STAFF',
                entity_id=pk,
                before_state={
                    'deleted_at': staff['deleted_at'].isoformat(),
                    'status': 'DEACTIVATED',
                },
                after_state={
                    'deleted_at': None,
                    'status': 'ACTIVE',
                },
            )

        updated_staff = self._get_staff(pk)

        return Response(
            {
                'message': 'Staff member activated successfully',
                'data': self._serialize_staff(updated_staff),
            },
            status=status.HTTP_200_OK,
        )


class DeactivateStaffView(StaffManagementMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request, pk):
        """
        Soft-delete/deactivate a staff member.

        A user cannot deactivate themselves.
        """

        actor_id = str(request.user.id)
        staff_id = str(pk)

        if actor_id == staff_id:
            return Response(
                {
                    'message': 'You cannot deactivate yourself',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        staff = self._get_staff(pk)

        if not staff:
            return Response(
                {
                    'message': 'Staff member not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        if staff['deleted_at'] is not None:
            return Response(
                {
                    'message': 'Staff member is already deactivated',
                },
                status=status.HTTP_409_CONFLICT,
            )

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE users
                    SET
                        deleted_at = CURRENT_TIMESTAMP,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                      AND role <> 'BORROWER'
                    """,
                    [staff_id],
                )

            self._write_audit_log(
                request=request,
                actor_id=actor_id,
                action='DEACTIVATE_STAFF',
                entity_id=staff_id,
                before_state={
                    'deleted_at': None,
                    'status': 'ACTIVE',
                },
                after_state={
                    'deleted_at': 'CURRENT_TIMESTAMP',
                    'status': 'DEACTIVATED',
                },
            )

        updated_staff = self._get_staff(staff_id)

        return Response(
            {
                'message': 'Staff member deactivated successfully',
                'data': self._serialize_staff(updated_staff),
            },
            status=status.HTTP_200_OK,
        )


class UpdateStaffRoleView(StaffManagementMixin, APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def post(self, request, pk):
        """
        Update a staff member's role.

        Role changes are intentionally isolated from profile updates.
        """

        actor_id = str(request.user.id)
        staff_id = str(pk)

        if actor_id == staff_id:
            return Response(
                {
                    'message': 'You cannot change your own role',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        role = self._normalize_optional_string(
            request.data.get('role')
        )

        if not role:
            return Response(
                {
                    'message': 'Role is required',
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if role not in STAFF_ROLES:
            return Response(
                {
                    'message': 'Invalid staff role',
                    'allowed_roles': sorted(STAFF_ROLES),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        staff = self._get_staff(staff_id)

        if not staff:
            return Response(
                {
                    'message': 'Staff member not found',
                },
                status=status.HTTP_404_NOT_FOUND,
            )

        current_role = str(staff['role'])

        if current_role == role:
            return Response(
                {
                    'message': 'Staff member already has this role',
                    'data': self._serialize_staff(staff),
                },
                status=status.HTTP_200_OK,
            )

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE users
                    SET
                        role = %s,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = %s
                      AND role <> 'BORROWER'
                    """,
                    [
                        role,
                        staff_id,
                    ],
                )

            self._write_audit_log(
                request=request,
                actor_id=actor_id,
                action='UPDATE_STAFF_ROLE',
                entity_id=staff_id,
                before_state={
                    'role': current_role,
                },
                after_state={
                    'role': role,
                },
            )

        updated_staff = self._get_staff(staff_id)

        return Response(
            {
                'message': 'Staff role updated successfully',
                'data': self._serialize_staff(updated_staff),
            },
            status=status.HTTP_200_OK,
        )
