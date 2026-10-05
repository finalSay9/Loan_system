import os

import jwt
from django.db import connection
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed


class PrismaUserJWTAuthentication(BaseAuthentication):
    """
    Authenticates users using JWTs issued by the NestJS API.

    Django does not issue or manage these JWTs.
    NestJS is the authentication authority.

    The JWT is verified using the same:
        - secret
        - algorithm

    used by NestJS.
    """

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return None

        parts = auth_header.split()

        if len(parts) != 2 or parts[0].lower() != 'bearer':
            raise AuthenticationFailed(
                'Authorization header must contain two space-delimited values'
            )

        token = parts[1]

        secret = os.environ.get('JWT_SECRET')

        if not secret:
            raise AuthenticationFailed(
                'JWT_SECRET is not configured'
            )

        try:
            payload = jwt.decode(
                token,
                secret,
                algorithms=['HS256'],
            )

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired')

        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token')

        user_id = payload.get('sub')

        if not user_id:
            raise AuthenticationFailed(
                'Token has no sub claim'
            )

        user = self.get_user(user_id)

        if not user:
            raise AuthenticationFailed(
                'User not found'
            )

        return user, token

    def get_user(self, user_id):
        """
        Load the Prisma user directly from the shared PostgreSQL database.
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
                    kyc_status
                FROM users
                WHERE id = %s
                  AND deleted_at IS NULL
                """,
                [str(user_id)],
            )

            row = cursor.fetchone()

        if not row:
            return None

        return PrismaUser(*row)


class PrismaUser:
    """
    Lightweight authenticated user representation.

    This is NOT Django's auth.User model.

    The users table is owned by Prisma/NestJS.
    """

    def __init__(
        self,
        id,
        name,
        phone,
        email,
        role,
        kyc_status,
    ):
        self.id = str(id)
        self.name = name
        self.phone = phone
        self.email = email
        self.role = role
        self.kyc_status = kyc_status

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False

    @property
    def is_staff(self):
        return self.role in (
            'SUPER_ADMIN',
            'LOAN_OFFICER',
        )

    def __str__(self):
        return self.name