from datetime import datetime, timezone
import json
import uuid

from django.contrib import admin, messages
from django.db import connection, transaction
from django.http import HttpRequest
from django.shortcuts import redirect
from django.urls import path
from django.utils.html import format_html

from .models import User


class KycStatusFilter(admin.SimpleListFilter):
    title = 'KYC Status'
    parameter_name = 'kyc'

    def lookups(self, request, model_admin):
        return [
            ('pending', '⏳ Pending verification'),
            ('verified', '✓ Verified'),
            ('rejected', '✗ Rejected'),
        ]

    def queryset(self, request, queryset):
        mapping = {
            'pending': 'PENDING',
            'verified': 'VERIFIED',
            'rejected': 'REJECTED',
        }

        status = mapping.get(self.value())

        if status:
            return queryset.filter(kyc_status=status)

        return queryset


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'phone',
        'email',
        'role',
        'kyc_badge',
        'created_at',
        'kyc_actions',
    ]

    list_filter = [
        'role',
        KycStatusFilter,
    ]

    search_fields = [
        'name',
        'phone',
        'email',
    ]

    readonly_fields = [
        'id',
        'created_at',
        'updated_at',
        'password_hash',
        'kyc_badge',
    ]

    exclude = [
        'password_hash',
    ]

    ordering = [
        '-created_at',
    ]

    actions = [
        'bulk_approve_kyc',
        'bulk_reject_kyc',
    ]

    # =========================================================
    # BULK ACTIONS
    # =========================================================

    @admin.action(description='Approve selected pending KYC')
    def bulk_approve_kyc(self, request, queryset):
        ids = [
            str(user.id)
            for user in queryset.filter(kyc_status='PENDING')
        ]

        if not ids:
            self.message_user(
                request,
                'No pending users selected.',
                messages.WARNING,
            )
            return

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE users
                    SET kyc_status = 'VERIFIED'
                    WHERE id = ANY(%s)
                    """,
                    [ids],
                )

        self.message_user(
            request,
            f'✓ {len(ids)} borrower(s) KYC approved.',
            messages.SUCCESS,
        )

    @admin.action(description='Reject selected pending KYC')
    def bulk_reject_kyc(self, request, queryset):
        ids = [
            str(user.id)
            for user in queryset.filter(kyc_status='PENDING')
        ]

        if not ids:
            self.message_user(
                request,
                'No pending users selected.',
                messages.WARNING,
            )
            return

        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    UPDATE users
                    SET kyc_status = 'REJECTED'
                    WHERE id = ANY(%s)
                    """,
                    [ids],
                )

        self.message_user(
            request,
            f'✗ {len(ids)} borrower(s) KYC rejected.',
            messages.ERROR,
        )

    # =========================================================
    # DISPLAY
    # =========================================================

    @admin.display(description='KYC Status')
    def kyc_badge(self, obj):
        colours = {
            'PENDING': ('orange', '⏳'),
            'VERIFIED': ('green', '✓'),
            'REJECTED': ('red', '✗'),
        }

        color, icon = colours.get(
            obj.kyc_status,
            ('grey', '?'),
        )

        return format_html(
            '<span style="color:{};font-weight:600;">{} {}</span>',
            color,
            icon,
            obj.kyc_status,
        )

    @admin.display(description='Actions')
    def kyc_actions(self, obj):
        if obj.kyc_status != 'PENDING':
            return format_html(
                '<span style="color:grey;font-size:12px;">{}</span>',
                obj.kyc_status,
            )

        return format_html(
            '<a class="button" '
            'href="{}" '
            'style="background:#16a34a;color:white;'
            'padding:4px 10px;border-radius:4px;'
            'text-decoration:none;margin-right:4px;">'
            'Approve'
            '</a>'
            '<a class="button" '
            'href="{}" '
            'style="background:#dc2626;color:white;'
            'padding:4px 10px;border-radius:4px;'
            'text-decoration:none;">'
            'Reject'
            '</a>',
            f'/admin/users/user/{obj.pk}/kyc/approve/',
            f'/admin/users/user/{obj.pk}/kyc/reject/',
        )

    # =========================================================
    # CUSTOM ADMIN URLS
    # =========================================================

    def get_urls(self):
        urls = super().get_urls()

        custom_urls = [
            path(
                '<str:user_id>/kyc/approve/',
                self.admin_site.admin_view(self.kyc_approve),
                name='user_kyc_approve',
            ),
            path(
                '<str:user_id>/kyc/reject/',
                self.admin_site.admin_view(self.kyc_reject),
                name='user_kyc_reject',
            ),
        ]

        return custom_urls + urls

    # =========================================================
    # APPROVE KYC
    # =========================================================

    def kyc_approve(
        self,
        request: HttpRequest,
        user_id: str,
    ):
        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, kyc_status
                    FROM users
                    WHERE id = %s
                    FOR UPDATE
                    """,
                    [str(user_id)],
                )

                row = cursor.fetchone()

                if not row:
                    messages.error(
                        request,
                        'User not found.',
                    )
                    return redirect(
                        'admin:users_user_changelist'
                    )

                user_id_str, user_name, kyc_status = (
                    str(row[0]),
                    row[1],
                    row[2],
                )

                if kyc_status != 'PENDING':
                    messages.warning(
                        request,
                        f'{user_name} KYC is already {kyc_status}.',
                    )
                    return redirect(
                        'admin:users_user_changelist'
                    )

                cursor.execute(
                    """
                    UPDATE users
                    SET kyc_status = 'VERIFIED'
                    WHERE id = %s
                    """,
                    [user_id_str],
                )

                self._write_audit(
                    request=request,
                    user_id=user_id_str,
                    action='KYC_APPROVED',
                    actor_name=request.user.username,
                    before='PENDING',
                    after='VERIFIED',
                )

        messages.success(
            request,
            f'✓ {user_name} KYC approved successfully.',
        )

        return redirect(
            'admin:users_user_changelist'
        )

    # =========================================================
    # REJECT KYC
    # =========================================================

    def kyc_reject(
        self,
        request: HttpRequest,
        user_id: str,
    ):
        with transaction.atomic():
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, name, kyc_status
                    FROM users
                    WHERE id = %s
                    FOR UPDATE
                    """,
                    [str(user_id)],
                )

                row = cursor.fetchone()

                if not row:
                    messages.error(
                        request,
                        'User not found.',
                    )
                    return redirect(
                        'admin:users_user_changelist'
                    )

                user_id_str, user_name, kyc_status = (
                    str(row[0]),
                    row[1],
                    row[2],
                )

                if kyc_status != 'PENDING':
                    messages.warning(
                        request,
                        f'{user_name} KYC is already {kyc_status}.',
                    )
                    return redirect(
                        'admin:users_user_changelist'
                    )

                cursor.execute(
                    """
                    UPDATE users
                    SET kyc_status = 'REJECTED'
                    WHERE id = %s
                    """,
                    [user_id_str],
                )

                self._write_audit(
                    request=request,
                    user_id=user_id_str,
                    action='KYC_REJECTED',
                    actor_name=request.user.username,
                    before='PENDING',
                    after='REJECTED',
                )

        messages.warning(
            request,
            f'✗ {user_name} KYC rejected.',
        )

        return redirect(
            'admin:users_user_changelist'
        )

    # =========================================================
    # AUDIT LOG
    # =========================================================

    def _write_audit(
        self,
        request,
        user_id,
        action,
        actor_name,
        before,
        after,
    ):
        """
        Write directly to the audit_logs table
        shared with the NestJS application.
        """

        with connection.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO audit_logs
                (
                    id,
                    actor_id,
                    action,
                    entity_type,
                    entity_id,
                    before_state,
                    after_state,
                    ip_address,
                    timestamp
                )
                VALUES
                (
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s,
                    %s
                )
                """,
                [
                    str(uuid.uuid4()),
                    user_id,
                    action,
                    'User',
                    user_id,
                    json.dumps({
                        'kyc_status': before,
                    }),
                    json.dumps({
                        'kyc_status': after,
                        'approved_by': actor_name,
                    }),
                    request.META.get('REMOTE_ADDR'),
                    datetime.now(timezone.utc),
                ],
            )