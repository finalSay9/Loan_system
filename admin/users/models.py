from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=255, null=True, blank=True, unique=True)
    address = models.TextField()
    occupation = models.CharField(max_length=255)
    password_hash = models.CharField(max_length=255, db_column='password_hash')
    role = models.CharField(max_length=50, default='BORROWER')
    kyc_status = models.CharField(max_length=50, default='PENDING', db_column='kyc_status')
    avatar_url = models.CharField(max_length=500, null=True, blank=True, db_column='avatar_url')
    created_at = models.DateTimeField(db_column='created_at')
    updated_at = models.DateTimeField(db_column='updated_at')
    deleted_at = models.DateTimeField(null=True, blank=True, db_column='deleted_at')

    class Meta:
        managed = False        # ← Prisma owns this table
        db_table = 'users'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.phone})'