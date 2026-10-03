from django.db import models


class Loan(models.Model):
    id = models.UUIDField(primary_key=True)
    user = models.ForeignKey(
        'users.User',
        on_delete=models.DO_NOTHING,
        db_column='user_id',
        related_name='loans'
    )
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    purpose = models.TextField()
    notes = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, default='PENDING')
    interest_rate = models.DecimalField(
        max_digits=5, decimal_places=2,
        db_column='interest_rate'
    )
    term_months = models.IntegerField(db_column='term_months')
    rejection_reason = models.TextField(
        null=True, blank=True,
        db_column='rejection_reason'
    )
    disbursed_at = models.DateTimeField(
        null=True, blank=True,
        db_column='disbursed_at'
    )
    version = models.IntegerField(default=0)
    created_at = models.DateTimeField(db_column='created_at')
    updated_at = models.DateTimeField(db_column='updated_at')
    deleted_at = models.DateTimeField(
        null=True, blank=True,
        db_column='deleted_at'
    )

    class Meta:
        managed = False
        db_table = 'loans'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user.name} — MWK {self.amount} ({self.status})'


class RepaymentSchedule(models.Model):
    id = models.UUIDField(primary_key=True)
    loan = models.ForeignKey(
        Loan,
        on_delete=models.DO_NOTHING,
        db_column='loan_id',
        related_name='repayments'
    )
    installment_number = models.IntegerField(db_column='installment_number')
    due_date = models.DateTimeField(db_column='due_date')
    principal_amount = models.DecimalField(
        max_digits=15, decimal_places=2,
        db_column='principal_amount'
    )
    interest_amount = models.DecimalField(
        max_digits=15, decimal_places=2,
        db_column='interest_amount'
    )
    amount_due = models.DecimalField(
        max_digits=15, decimal_places=2,
        db_column='amount_due'
    )
    amount_paid = models.DecimalField(
        max_digits=15, decimal_places=2,
        default=0,
        db_column='amount_paid'
    )
    remaining_balance = models.DecimalField(
        max_digits=15, decimal_places=2,
        db_column='remaining_balance'
    )
    penalty = models.DecimalField(
        max_digits=15, decimal_places=2,
        default=0
    )
    status = models.CharField(max_length=50, default='PENDING')
    created_at = models.DateTimeField(db_column='created_at')

    class Meta:
        managed = False
        db_table = 'repayment_schedules'
        ordering = ['due_date']

    def __str__(self):
        return f'Installment #{self.installment_number} — {self.status}'


class Transaction(models.Model):
    id = models.UUIDField(primary_key=True)
    loan = models.ForeignKey(
        Loan,
        on_delete=models.DO_NOTHING,
        db_column='loan_id',
        related_name='transactions'
    )
    type = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    reference = models.CharField(max_length=255, unique=True)
    provider_ref = models.CharField(
        max_length=255, null=True, blank=True,
        db_column='provider_ref'
    )
    created_at = models.DateTimeField(db_column='created_at')

    class Meta:
        managed = False
        db_table = 'transactions'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.type} — MWK {self.amount} ({self.reference})'


class AuditLog(models.Model):
    id = models.UUIDField(primary_key=True)
    actor = models.ForeignKey(
        'users.User',
        on_delete=models.DO_NOTHING,
        db_column='actor_id',
        related_name='audit_logs'
    )
    action = models.CharField(max_length=255)
    entity_type = models.CharField(max_length=255, db_column='entity_type')
    entity_id = models.CharField(max_length=255, db_column='entity_id')
    before_state = models.JSONField(null=True, blank=True, db_column='before_state')
    after_state = models.JSONField(null=True, blank=True, db_column='after_state')
    ip_address = models.CharField(
        max_length=100, null=True, blank=True,
        db_column='ip_address'
    )
    timestamp = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'audit_logs'
        ordering = ['-timestamp']

    def __str__(self):
        return f'{self.action} by {self.actor.name} at {self.timestamp}'