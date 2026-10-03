from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.db import connection


class PrismaUserJWTAuthentication(JWTAuthentication):
    """
    Validates NestJS-issued JWTs against the Prisma users table.
    No Django auth_user involvement.
    """

    def get_user(self, validated_token):
        user_id = validated_token.get('sub')
        if not user_id:
            raise InvalidToken('Token has no sub claim')

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, phone, email, role
                FROM users
                WHERE id = %s::uuid
                  AND deleted_at IS NULL
                """,
                [str(user_id)]
            )
            row = cursor.fetchone()

        if not row:
            raise InvalidToken('User not found')

        # Return a simple object DRF can use
        return PrismaUser(*row)


class PrismaUser:
    """Lightweight user object from Prisma users table."""

    def __init__(self, id, name, phone, email, role):
        self.id = str(id)
        self.name = name
        self.phone = phone
        self.email = email
        self.role = role
        self.is_authenticated = True
        self.is_staff = role in ('SUPER_ADMIN', 'LOAN_OFFICER')

    def __str__(self):
        return self.name