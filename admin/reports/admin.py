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

    
