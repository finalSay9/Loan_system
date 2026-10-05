from django.urls import path
from users import views

urlpatterns = [
    path('staff/',           views.StaffListCreateView.as_view()),
    path('staff/<str:pk>/',  views.StaffDetailView.as_view()),
    path('staff/<str:pk>/activate/',   views.ActivateStaffView.as_view()),
    path('staff/<str:pk>/deactivate/', views.DeactivateStaffView.as_view()),
    path('staff/<str:pk>/role/',       views.UpdateStaffRoleView.as_view()),
]