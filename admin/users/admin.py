from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'role', 'kyc_status', 'created_at']
    list_filter = ['role', 'kyc_status']
    search_fields = ['name', 'phone', 'email']
    readonly_fields = ['id', 'created_at', 'updated_at', 'password_hash']
    ordering = ['-created_at']

    # Exclude password hash from the edit form
    exclude = ['password_hash']