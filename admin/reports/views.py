from datetime import date, timedelta
from decimal import Decimal

from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from backoffice.permissions import IsAdminRole


# ============================================================
# SHARED HELPERS
# ============================================================

def parse_date(value, default):
    """
    Parse YYYY-MM-DD safely.

    Returns the default when no value is supplied.
    Raises ValueError when the supplied value is invalid.
    """

    if not value:
        return default

    try:
        return date.fromisoformat(value)
    except ValueError:
        raise ValueError(
            f"Invalid date '{value}'. "
            "Expected format YYYY-MM-DD."
        )


def get_date_range(request):
    """
    Read ?start=YYYY-MM-DD&end=YYYY-MM-DD.

    Default:
        last 30 days through today.
    """

    today = date.today()

    default_start = today - timedelta(days=30)
    default_end = today

    start_date = parse_date(
        request.query_params.get('start'),
        default_start,
    )

    end_date = parse_date(
        request.query_params.get('end'),
        default_end,
    )

    if start_date > end_date:
        raise ValueError(
            'Start date cannot be after end date.'
        )

    return start_date, end_date


def decimal_to_string(value):
    """
    Convert PostgreSQL NUMERIC / Decimal values to strings.

    This avoids JavaScript floating-point precision problems.
    """

    if value is None:
        return '0.00'

    return format(
        Decimal(value),
        '.2f',
    )


from datetime import date, datetime
import uuid

def rows_to_dicts(cursor):
    columns = [col[0] for col in cursor.description]
    rows = []
    for row in cursor.fetchall():
        d = {}
        for col, val in zip(columns, row):
            if isinstance(val, (date, datetime)):
                d[col] = val.isoformat()
            elif isinstance(val, uuid.UUID):
                d[col] = str(val)
            else:
                d[col] = val
        rows.append(d)
    return rows


def serialize_money(rows, fields):
    """
    Convert Decimal financial fields into JSON-safe strings.
    """

    for row in rows:
        for field in fields:
            row[field] = decimal_to_string(
                row[field]
            )

    return rows


# ============================================================
# DISBURSEMENTS
# ============================================================

class DisbursementReportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):

        try:
            start_date, end_date = get_date_range(request)

        except ValueError as exc:
            return Response(
                {
                    'error': str(exc),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT
                    DATE(l.disbursed_at) AS date,

                    COUNT(*) AS loan_count,

                    COALESCE(
                        SUM(l.amount),
                        0
                    ) AS total_disbursed

                FROM loans l

                WHERE
                    l.status = 'DISBURSED'

                    AND l.disbursed_at >= %s

                    AND l.disbursed_at
                        < %s

                GROUP BY
                    DATE(l.disbursed_at)

                ORDER BY
                    date DESC
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            rows = rows_to_dicts(cursor)

        rows = serialize_money(
            rows,
            ['total_disbursed'],
        )

        total_loans = sum(
            row['loan_count']
            for row in rows
        )

        total_disbursed = sum(
            Decimal(row['total_disbursed'])
            for row in rows
        )

        return Response(
            {
                'data': rows,

                'totals': {
                    'loan_count': total_loans,

                    'total_disbursed':
                        decimal_to_string(
                            total_disbursed
                        ),
                },

                'filters': {
                    'start': start_date.isoformat(),
                    'end': end_date.isoformat(),
                },
            }
        )


# ============================================================
# COLLECTIONS
# ============================================================

class CollectionsReportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):

        try:
            start_date, end_date = get_date_range(request)

        except ValueError as exc:
            return Response(
                {
                    'error': str(exc),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT
                    DATE(t.created_at) AS date,

                    COUNT(*) AS payment_count,

                    COALESCE(
                        SUM(t.amount),
                        0
                    ) AS total_collected

                FROM transactions t

                WHERE
                    t.type = 'REPAYMENT'

                    AND t.created_at >= %s

                    AND t.created_at
                        < %s

                GROUP BY
                    DATE(t.created_at)

                ORDER BY
                    date DESC
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            rows = rows_to_dicts(cursor)

        rows = serialize_money(
            rows,
            ['total_collected'],
        )

        total_payments = sum(
            row['payment_count']
            for row in rows
        )

        total_collected = sum(
            Decimal(row['total_collected'])
            for row in rows
        )

        return Response(
            {
                'data': rows,

                'totals': {
                    'payment_count':
                        total_payments,

                    'total_collected':
                        decimal_to_string(
                            total_collected
                        ),
                },

                'filters': {
                    'start': start_date.isoformat(),
                    'end': end_date.isoformat(),
                },
            }
        )


# ============================================================
# DELINQUENCY
# ============================================================

class DelinquencyReportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):

        with connection.cursor() as cursor:

            cursor.execute(
                """
                SELECT
                    rs.id AS schedule_id,

                    rs.loan_id,

                    l.user_id,

                    u.name AS borrower_name,

                    u.phone,

                    rs.due_date,

                    rs.amount_due,

                    rs.amount_paid,

                    (
                        rs.amount_due
                        - rs.amount_paid
                    ) AS outstanding,

                    (
                        CURRENT_DATE
                        - rs.due_date::date
                    ) AS days_overdue

                FROM repayment_schedules rs

                INNER JOIN loans l
                    ON l.id = rs.loan_id

                INNER JOIN users u
                    ON u.id = l.user_id

                WHERE

                    rs.due_date < CURRENT_DATE

                    AND rs.status != 'PAID'

                    AND (
                        rs.amount_due
                        - rs.amount_paid
                    ) > 0

                ORDER BY
                    days_overdue DESC,
                    outstanding DESC
                """
            )

            rows = rows_to_dicts(cursor)

        rows = serialize_money(
            rows,
            [
                'amount_due',
                'amount_paid',
                'outstanding',
            ],
        )

        total_outstanding = sum(
            Decimal(row['outstanding'])
            for row in rows
        )

        total_loans = len({
            row['loan_id']
            for row in rows
        })

        total_borrowers = len({
            row['user_id']
            for row in rows
        })

        return Response(
            {
                'data': rows,

                'totals': {
                    'delinquent_installments':
                        len(rows),

                    'delinquent_loans':
                        total_loans,

                    'affected_borrowers':
                        total_borrowers,

                    'total_outstanding':
                        decimal_to_string(
                            total_outstanding
                        ),
                },
            }
        )


# ============================================================
# DASHBOARD SUMMARY
# ============================================================

class ReportSummaryView(APIView):
    """
    Single endpoint powering the financial dashboard.

    Returns:
        - total disbursed
        - total collected
        - outstanding delinquency
        - number of delinquent loans
        - number of delinquent borrowers
        - current reporting period
    """

    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):

        try:
            start_date, end_date = get_date_range(request)

        except ValueError as exc:
            return Response(
                {
                    'error': str(exc),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        with connection.cursor() as cursor:

            # ------------------------------------------------
            # DISBURSEMENTS
            # ------------------------------------------------

            cursor.execute(
                """
                SELECT
                    COUNT(*),
                    COALESCE(
                        SUM(l.amount),
                        0
                    )
                FROM loans l
                WHERE
                    l.status = 'DISBURSED'

                    AND l.disbursed_at >= %s

                    AND l.disbursed_at < %s
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            disbursement_count, total_disbursed = (
                cursor.fetchone()
            )

            # ------------------------------------------------
            # COLLECTIONS
            # ------------------------------------------------

            cursor.execute(
                """
                SELECT
                    COUNT(*),
                    COALESCE(
                        SUM(t.amount),
                        0
                    )
                FROM transactions t
                WHERE
                    t.type = 'REPAYMENT'

                    AND t.created_at >= %s

                    AND t.created_at < %s
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            collection_count, total_collected = (
                cursor.fetchone()
            )

            # ------------------------------------------------
            # DELINQUENCY
            # ------------------------------------------------

            cursor.execute(
                """
                SELECT
                    COUNT(*),

                    COUNT(
                        DISTINCT rs.loan_id
                    ),

                    COUNT(
                        DISTINCT l.user_id
                    ),

                    COALESCE(
                        SUM(
                            rs.amount_due
                            - rs.amount_paid
                        ),
                        0
                    )

                FROM repayment_schedules rs

                INNER JOIN loans l
                    ON l.id = rs.loan_id

                WHERE

                    rs.due_date < CURRENT_DATE

                    AND rs.status != 'PAID'

                    AND (
                        rs.amount_due
                        - rs.amount_paid
                    ) > 0
                """
            )

            (
                delinquent_installments,
                delinquent_loans,
                delinquent_borrowers,
                delinquent_outstanding,
            ) = cursor.fetchone()

        return Response(
            {
                'data': {
                    'disbursements': {
                        'loan_count':
                            disbursement_count,

                        'total':
                            decimal_to_string(
                                total_disbursed
                            ),
                    },

                    'collections': {
                        'payment_count':
                            collection_count,

                        'total':
                            decimal_to_string(
                                total_collected
                            ),
                    },

                    'delinquency': {
                        'installments':
                            delinquent_installments,

                        'loans':
                            delinquent_loans,

                        'borrowers':
                            delinquent_borrowers,

                        'outstanding':
                            decimal_to_string(
                                delinquent_outstanding
                            ),
                    },
                },

                'filters': {
                    'start':
                        start_date.isoformat(),

                    'end':
                        end_date.isoformat(),
                },
            }
        )


import csv
from django.http import HttpResponse

class DisbursementExportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        try:
            start_date, end_date = get_date_range(request)
        except ValueError as exc:
            return Response({'error': str(exc)}, status=400)

        # reuse same query from DisbursementReportView
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE(l.disbursed_at), COUNT(*), COALESCE(SUM(l.amount), 0)
                FROM loans l
                WHERE l.status = 'DISBURSED'
                  AND l.disbursed_at >= %s AND l.disbursed_at < %s
                GROUP BY DATE(l.disbursed_at)
                ORDER BY 1 DESC
                """,
                [start_date, end_date + timedelta(days=1)],
            )
            rows = cursor.fetchall()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="disbursements.csv"'
        writer = csv.writer(response)
        writer.writerow(['Date', 'Loans Disbursed', 'Total Amount (MWK)'])
        for row in rows:
            writer.writerow(row)
        return response


class CollectionsExportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        try:
            start_date, end_date = get_date_range(request)
        except ValueError as exc:
            return Response({'error': str(exc)}, status=400)

        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT DATE(t.created_at), COUNT(*), COALESCE(SUM(t.amount), 0)
                FROM transactions t
                WHERE t.type = 'REPAYMENT'
                  AND t.created_at >= %s AND t.created_at < %s
                GROUP BY DATE(t.created_at)
                ORDER BY 1 DESC
                """,
                [start_date, end_date + timedelta(days=1)],
            )
            rows = cursor.fetchall()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="collections.csv"'
        writer = csv.writer(response)
        writer.writerow(['Date', 'Payments Received', 'Total Collected (MWK)'])
        for row in rows:
            writer.writerow(row)
        return response


class DelinquencyExportView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]

    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT u.name, u.phone, rs.loan_id,
                       rs.due_date, rs.amount_due, rs.amount_paid,
                       (rs.amount_due - rs.amount_paid),
                       (CURRENT_DATE - rs.due_date::date)
                FROM repayment_schedules rs
                JOIN loans l ON l.id = rs.loan_id
                JOIN users u ON u.id = l.user_id
                WHERE rs.due_date < CURRENT_DATE
                  AND rs.status != 'PAID'
                  AND (rs.amount_due - rs.amount_paid) > 0
                ORDER BY 8 DESC
                """
            )
            rows = cursor.fetchall()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="delinquency.csv"'
        writer = csv.writer(response)
        writer.writerow([
            'Borrower', 'Phone', 'Loan ID', 'Due Date',
            'Amount Due', 'Amount Paid', 'Outstanding', 'Days Overdue'
        ])
        for row in rows:
            writer.writerow(row)
        return response