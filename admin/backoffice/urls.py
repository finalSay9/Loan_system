from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('backoffice/api/', include('reports.urls')),
    path('backoffice/api/', include('users.urls')),
]