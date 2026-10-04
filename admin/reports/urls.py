from django.urls import path
from reports import views

urlpatterns = [
    path('reports/summary/',              views.ReportSummaryView.as_view()),
    path('reports/disbursements/',        views.DisbursementReportView.as_view()),
    path('reports/disbursements/export/', views.DisbursementExportView.as_view()),
    path('reports/collections/',          views.CollectionsReportView.as_view()),
    path('reports/collections/export/',   views.CollectionsExportView.as_view()),
    path('reports/delinquency/',          views.DelinquencyReportView.as_view()),
    path('reports/delinquency/export/',   views.DelinquencyExportView.as_view()),
]