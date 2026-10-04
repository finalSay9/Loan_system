from rest_framework.permissions import BasePermission

ADMIN_ROLES = {'SUPER_ADMIN', 'LOAN_OFFICER', 'ACCOUNTANT', 'COMPLIANCE_OFFICER'}

class IsAdminRole(BasePermission):
    """Only staff roles can access backoffice endpoints."""
    message = 'You do not have permission to access this resource.'

    def has_permission(self, request, view):
        user = request.user
        return (
            bool(user and user.is_authenticated)
            and getattr(user, 'role', None) in ADMIN_ROLES
        )