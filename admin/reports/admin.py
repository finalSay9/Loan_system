from django.contrib import admin
from django.http import HttpReponse
from django.urls import path
from django.shortcuts import render
from django.db import connections
import csv
from datetime import datetime, timedelta


class FinancialReportAdmin(admin.ModelAdmin):
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


class DisbursmentReportAdmin(FinancialReportAdmin):
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
