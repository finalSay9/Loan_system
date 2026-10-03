from django.contrib import admin
from django.http import HttpResponse
from django.urls import path
from django.shortcuts import render
from django.db import connection
import csv
from datetime import date, datetime, timedelta


class FinancialReportsAdmin(admin.ModelAdmin):
    """
    Shared base class for financial reporting.

    These reports are read-only and query the PostgreSQL database
    directly because Prisma owns the underlying tables.
    """


    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_view_permission(self, request, obj=None):
        return request.user.is_staff


class DisbursmentReportAdmin(FinancialReportsAdmin):
    """
    Admin view for the disbursment report

    """
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                '',
                self.admin_site.admin_view(self.disbursment_report_view),
                name='disbursment_report',
            ), 
            path(
                'export',
                self.admin_site.admin_view(self.export_disbursment_report),
                name='disbursment_report_export',
            ),

        ]
        return custom_urls + urls


    def disbursment_report(self, request):
        start_date, end_date = self._get_date_range(request)

        rows = self._get_disbursments(
            start_date,
            end_date
        )
        totals = self._calculate_disbursments_totals(rows)
        context = {
            **self.admin_site.each_context(request),
            'title': 'Daily Disbursement Report',
            'rows': rows,
            'totals': totals,
            'start_date': start_date,
            'end_date': end_date,
            'export_url': 'admin:disbursement_report_export',
        }

        return render(
            request,
            'admin/reports/disbursements.html',
            context,
        )


    def _get_disbursements(self, start_date, end_date):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    DATE(l.disbursed_at) AS disbursement_date,
                    COUNT(*) AS loan_count,
                    COALESCE(SUM(l.amount), 0) AS total_disbursed
                FROM loans l
                WHERE
                    l.status = 'DISBURSED'
                    AND l.disbursed_at >= %s
                    AND l.disbursed_at < %s
                GROUP BY DATE(l.disbursed_at)
                ORDER BY disbursement_date DESC
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            columns = [
                'date',
                'loan_count',
                'total_disbursed',
            ]

            return [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
    

    def _calculate_disbursement_totals(self, rows):
        return {
            'loan_count': sum(
                row['loan_count']
                for row in rows
            ),
            'total_disbursed': sum(
                row['total_disbursed']
                for row in rows
            ),
        }

    def export_disbursements(self, request):
        start_date, end_date = self._get_date_range(request)

        rows = self._get_disbursements(
            start_date,
            end_date,
        )

        response = HttpResponse(
            content_type='text/csv'
        )

        response[
            'Content-Disposition'
        ] = (
            'attachment; '
            'filename="daily_disbursements.csv"'
        )

        writer = csv.writer(response)

        writer.writerow([
            'Date',
            'Number of Loans',
            'Total Disbursed',
        ])

        for row in rows:
            writer.writerow([
                row['date'],
                row['loan_count'],
                row['total_disbursed'],
            ])

        return response

    @staticmethod
    def _get_date_range(request):
        today = date.today()

        start = request.GET.get(
            'start',
            str(today - timedelta(days=30)),
        )

        end = request.GET.get(
            'end',
            str(today),
        )

        return (
            date.fromisoformat(start),
            date.fromisoformat(end),
        )



class CollectionsReportAdmin(FinancialReportsAdmin):

    def get_urls(self):
        urls = super().get_urls()

        custom_urls = [
            path(
                '',
                self.admin_site.admin_view(
                    self.collections_report
                ),
                name='collections_report',
            ),
            path(
                'export/',
                self.admin_site.admin_view(
                    self.export_collections
                ),
                name='collections_report_export',
            ),
        ]

        return custom_urls + urls

    def collections_report(self, request):
        start_date, end_date = self._get_date_range(request)

        rows = self._get_collections(
            start_date,
            end_date,
        )

        totals = {
            'payment_count': sum(
                row['payment_count']
                for row in rows
            ),
            'total_collected': sum(
                row['total_collected']
                for row in rows
            ),
        }

        context = {
            **self.admin_site.each_context(request),
            'title': 'Collections Report',
            'rows': rows,
            'totals': totals,
            'start_date': start_date,
            'end_date': end_date,
        }

        return render(
            request,
            'admin/reports/collections.html',
            context,
        )

    def _get_collections(self, start_date, end_date):
        with connection.cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    DATE(t.created_at) AS collection_date,
                    COUNT(*) AS payment_count,
                    COALESCE(SUM(t.amount), 0) AS total_collected
                FROM transactions t
                WHERE
                    t.type = 'REPAYMENT'
                    AND t.created_at >= %s
                    AND t.created_at < %s
                GROUP BY DATE(t.created_at)
                ORDER BY collection_date DESC
                """,
                [
                    start_date,
                    end_date + timedelta(days=1),
                ],
            )

            columns = [
                'date',
                'payment_count',
                'total_collected',
            ]

            return [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]

    def export_collections(self, request):
        start_date, end_date = self._get_date_range(request)

        rows = self._get_collections(
            start_date,
            end_date,
        )

        response = HttpResponse(
            content_type='text/csv'
        )

        response[
            'Content-Disposition'
        ] = (
            'attachment; '
            'filename="collections.csv"'
        )

        writer = csv.writer(response)

        writer.writerow([
            'Date',
            'Number of Payments',
            'Total Collected',
        ])

        for row in rows:
            writer.writerow([
                row['date'],
                row['payment_count'],
                row['total_collected'],
            ])

        return response

    @staticmethod
    def _get_date_range(request):
        today = date.today()

        start = request.GET.get(
            'start',
            str(today - timedelta(days=30)),
        )

        end = request.GET.get(
            'end',
            str(today),
        )

        return (
            date.fromisoformat(start),
            date.fromisoformat(end),
        )


class DelinquencyReportAdmin(FinancialReportsAdmin):

    def get_urls(self):
        urls = super().get_urls()

        custom_urls = [
            path(
                '',
                self.admin_site.admin_view(
                    self.delinquency_report
                ),
                name='delinquency_report',
            ),
            path(
                'export/',
                self.admin_site.admin_view(
                    self.export_delinquency
                ),
                name='delinquency_report_export',
            ),
        ]

        return custom_urls + urls

    def delinquency_report(self, request):
        rows = self._get_delinquency()

        totals = {
            'installments': len(rows),

            'outstanding': sum(
                row['outstanding']
                for row in rows
            ),

            'loans': len({
                row['loan_id']
                for row in rows
            }),

            'borrowers': len({
                row['user_id']
                for row in rows
            }),
        }

        context = {
            **self.admin_site.each_context(request),
            'title': 'Delinquency Report',
            'rows': rows,
            'totals': totals,
        }

        return render(
            request,
            'admin/reports/delinquency.html',
            context,
        )

    def _get_delinquency(self):
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
                        rs.amount_due - rs.amount_paid
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
                        rs.amount_due - rs.amount_paid
                    ) > 0

                ORDER BY
                    days_overdue DESC,
                    outstanding DESC
                """
            )

            columns = [
                'schedule_id',
                'loan_id',
                'user_id',
                'borrower_name',
                'phone',
                'due_date',
                'amount_due',
                'amount_paid',
                'outstanding',
                'days_overdue',
            ]

            return [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]

    def export_delinquency(self, request):
        rows = self._get_delinquency()

        response = HttpResponse(
            content_type='text/csv'
        )

        response[
            'Content-Disposition'
        ] = (
            'attachment; '
            'filename="delinquency_report.csv"'
        )

        writer = csv.writer(response)

        writer.writerow([
            'Borrower',
            'Phone',
            'Loan ID',
            'Due Date',
            'Amount Due',
            'Amount Paid',
            'Outstanding',
            'Days Overdue',
        ])

        for row in rows:
            writer.writerow([
                row['borrower_name'],
                row['phone'],
                row['loan_id'],
                row['due_date'],
                row['amount_due'],
                row['amount_paid'],
                row['outstanding'],
                row['days_overdue'],
            ])

        return response
