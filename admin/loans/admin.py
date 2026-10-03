from django.contrib import admin
from .models import Loan, RepaymentSchedule, Transaction, AuditLog


class RepaymentScheduleInline(admin.TabularInline):
    model = RepaymentSchedule
    extra = 0
    readonly_fields = [
        'id', 'installment_number', 'due_date',
        'amount_due', 'amount_paid', 'remaining_balance',
        'penalty', 'status'
    ]
    can_delete = False


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'user', 'amount', 'purpose',
        'status', 'interest_rate', 'term_months', 'created_at'
    ]
    list_filter = ['status']
    search_fields = ['user__name', 'user__phone', 'purpose']
    readonly_fields = ['id', 'created_at', 'updated_at', 'version']
    ordering = ['-created_at']
    inlines = [RepaymentScheduleInline]

    # Prevent accidental edits to financial fields
    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing existing loan
            return self.readonly_fields + ['amount', 'user', 'interest_rate', 'term_months']
        return self.readonly_fields


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['id', 'loan', 'type', 'amount', 'reference', 'created_at']
    list_filter = ['type']
    search_fields = ['reference', 'loan__user__name']
    readonly_fields = ['id', 'created_at']


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['action', 'actor', 'entity_type', 'entity_id', 'timestamp']
    list_filter = ['action', 'entity_type']
    search_fields = ['actor__name', 'action', 'entity_id']
    readonly_fields = [
        'id', 'actor', 'action', 'entity_type',
        'entity_id', 'before_state', 'after_state', 'timestamp'
    ]

    def has_add_permission(self, request):
        return False  # audit logs are never manually created

    def has_delete_permission(self, request, obj=None):
        return False  # audit logs are never deleted