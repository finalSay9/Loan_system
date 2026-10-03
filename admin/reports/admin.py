from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.shortcuts import render
from django.db import connection
from datetime import date, timedelta
import csv

from reports.models import (
    DisbursementReport,
    CollectionsReport,
    DelinquencyReport,
)


# ── Base class shared by all report admins ────────────────
class FinancialReportAdmin(admin.ModelAdmin):
    """
    Read-only base for all financial reports.
    Queries PostgreSQL directly — Prisma owns the tables.
    """

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_view_permission(self, request, obj=None):
        return request.user.is_staff

    @staticmethod
    def _get_date_range(request):
        today = date.today()
        start = request.GET.get('start', str(today - timedelta(days=30)))
        end = request.GET.get('end', str(today))
        return date.fromisoformat(start), date.fromisoformat(end)


# ── Disbursement Report ───────────────────────────────────
class DisbursementReportAdmin(FinancialReportAdmin):

    def get_urls(self):
        custom = [
            path(
                '',
                self.admin_site.admin_view(self.disbursement_report),
                name='disbursement_report',
            ),
            path(
                'export/',
                self.admin_site.admin_view(self.export_disbursements),
                name='disbursement_report_export',
            ),
        ]
        return custom + super().get_urls()

    def disbursement_report(self, request):
        start_date, end_date = self._get_date_range(request)
        rows = self._get_disbursements(start_date, end_date)
        totals = {
            'loan_count': sum(r['loan_count'] for r in rows),
            'total_disbursed': sum(r['total_disbursed'] for r in rows),
        }
        context = {
            **self.admin_site.each_context(request),
            'title': 'Disbursement Report',
            'rows': rows,
            'totals': totals,
            'start_date': start_date,
            'end_date': end_date,
        }
        return render(request, 'admin/reports/disbursements.html', context)

    def _get_disbursements(self, start_date, end_date):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    DATE(l.disbursed_at)       AS date,
                    COUNT(*)                   AS loan_count,
                    COALESCE(SUM(l.amount), 0) AS total_disbursed
                FROM loans l
                WHERE
                    l.status = 'DISBURSED'
                    AND l.disbursed_at >= %s
                    AND l.disbursed_at <  %s
                GROUP BY DATE(l.disbursed_at)
                ORDER BY date DESC
                """,
                [start_date, end_date + timedelta(days=1)],
            )
            cols = ['date', 'loan_count', 'total_disbursed']
            return [dict(zip(cols, row)) for row in cursor.fetchall()]

    def export_disbursements(self, request):
        start_date, end_date = self._get_date_range(request)
        rows = self._get_disbursements(start_date, end_date)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            'attachment; filename="disbursements.csv"'
        )
        writer = csv.writer(response)
        writer.writerow(['Date', 'Loans Disbursed', 'Total Amount (MWK)'])
        for r in rows:
            writer.writerow([r['date'], r['loan_count'], r['total_disbursed']])
        return response


# ── Collections Report ────────────────────────────────────
class CollectionsReportAdmin(FinancialReportAdmin):

    def get_urls(self):
        custom = [
            path(
                '',
                self.admin_site.admin_view(self.collections_report),
                name='collections_report',
            ),
            path(
                'export/',
                self.admin_site.admin_view(self.export_collections),
                name='collections_report_export',
            ),
        ]
        return custom + super().get_urls()

    def collections_report(self, request):
        start_date, end_date = self._get_date_range(request)
        rows = self._get_collections(start_date, end_date)
        totals = {
            'payment_count': sum(r['payment_count'] for r in rows),
            'total_collected': sum(r['total_collected'] for r in rows),
        }
        context = {
            **self.admin_site.each_context(request),
            'title': 'Collections Report',
            'rows': rows,
            'totals': totals,
            'start_date': start_date,
            'end_date': end_date,
        }
        return render(request, 'admin/reports/collections.html', context)

    def _get_collections(self, start_date, end_date):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    DATE(t.created_at)         AS date,
                    COUNT(*)                   AS payment_count,
                    COALESCE(SUM(t.amount), 0) AS total_collected
                FROM transactions t
                WHERE
                    t.type = 'REPAYMENT'
                    AND t.created_at >= %s
                    AND t.created_at <  %s
                GROUP BY DATE(t.created_at)
                ORDER BY date DESC
                """,
                [start_date, end_date + timedelta(days=1)],
            )
            cols = ['date', 'payment_count', 'total_collected']
            return [dict(zip(cols, row)) for row in cursor.fetchall()]

    def export_collections(self, request):
        start_date, end_date = self._get_date_range(request)
        rows = self._get_collections(start_date, end_date)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            'attachment; filename="collections.csv"'
        )
        writer = csv.writer(response)
        writer.writerow(['Date', 'Payments Received', 'Total Collected (MWK)'])
        for r in rows:
            writer.writerow([r['date'], r['payment_count'], r['total_collected']])
        return response


# ── Delinquency Report ────────────────────────────────────
class DelinquencyReportAdmin(FinancialReportAdmin):

    def get_urls(self):
        custom = [
            path(
                '',
                self.admin_site.admin_view(self.delinquency_report),
                name='delinquency_report',
            ),
            path(
                'export/',
                self.admin_site.admin_view(self.export_delinquency),
                name='delinquency_report_export',
            ),
        ]
        return custom + super().get_urls()

    def delinquency_report(self, request):
        rows = self._get_delinquency()
        totals = {
            'overdue_installments': len(rows),
            'affected_loans':       len({r['loan_id'] for r in rows}),
            'affected_borrowers':   len({r['user_id'] for r in rows}),
            'total_outstanding':    sum(r['outstanding'] for r in rows),
        }
        context = {
            **self.admin_site.each_context(request),
            'title': 'Delinquency Report',
            'rows': rows,
            'totals': totals,
        }
        return render(request, 'admin/reports/delinquency.html', context)

    def _get_delinquency(self):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    rs.id                              AS schedule_id,
                    rs.loan_id,
                    l.user_id,
                    u.name                             AS borrower_name,
                    u.phone,
                    rs.due_date,
                    rs.amount_due,
                    rs.amount_paid,
                    (rs.amount_due - rs.amount_paid)   AS outstanding,
                    (CURRENT_DATE - rs.due_date::date) AS days_overdue
                FROM repayment_schedules rs
                JOIN loans l ON l.id = rs.loan_id
                JOIN users u ON u.id = l.user_id
                WHERE
                    rs.due_date < CURRENT_DATE
                    AND rs.status != 'PAID'
                    AND (rs.amount_due - rs.amount_paid) > 0
                ORDER BY days_overdue DESC, outstanding DESC
                """
            )
            cols = [
                'schedule_id', 'loan_id', 'user_id',
                'borrower_name', 'phone', 'due_date',
                'amount_due', 'amount_paid', 'outstanding', 'days_overdue',
            ]
            return [dict(zip(cols, row)) for row in cursor.fetchall()]

    def export_delinquency(self, request):
        rows = self._get_delinquency()

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = (
            'attachment; filename="delinquency.csv"'
        )
        writer = csv.writer(response)
        writer.writerow([
            'Borrower', 'Phone', 'Loan ID',
            'Due Date', 'Amount Due (MWK)', 'Amount Paid (MWK)',
            'Outstanding (MWK)', 'Days Overdue',
        ])
        for r in rows:
            writer.writerow([
                r['borrower_name'], r['phone'], r['loan_id'],
                r['due_date'], r['amount_due'], r['amount_paid'],
                r['outstanding'], r['days_overdue'],
            ])
        return response


# ── Register ──────────────────────────────────────────────
admin.site.register(DisbursementReport, DisbursementReportAdmin)
admin.site.register(CollectionsReport,  CollectionsReportAdmin)
admin.site.register(DelinquencyReport,  DelinquencyReportAdmin)
