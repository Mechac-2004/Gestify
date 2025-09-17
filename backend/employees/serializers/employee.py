# serializers.py
from rest_framework import serializers
from employees.models import Employee



class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Employee model.
    Handles the serialization and deserialization of Employee data,
    including custom ID generation.
    """
    class Meta:
        model = Employee
        fields = ['employee_id', 'first_name', 'last_name', 'location', 'email', 'job_title', 'salary']
        # 'employee_id' is included in fields as it's part of the model,
        # but it will be generated automatically by the signal before saving.
        read_only_fields = ['employee_id'] 
