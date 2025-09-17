from django.urls import path
from employees.views import EmployeeListCreateAPIView, EmployeeDetailAPIView

urlpatterns = [
    path('employees/', EmployeeListCreateAPIView.as_view()),
    path('employees/<int:pk>/', EmployeeDetailAPIView.as_view()),
]
