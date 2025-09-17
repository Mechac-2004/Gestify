from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

class Employee(models.Model):
    # Custom ID field for the employee
    # 'employee_id' will store the unique identifier.
    # max_length=10: The ID can be up to 10 characters long.
    # unique=True: Ensures no two employees have the same ID.
    # blank=True, null=True: Allows the field to be empty initially, which is necessary for auto-generation.
    employee_id = models.CharField(max_length=10, unique=True, blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    job_title = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        # This method defines how an Employee object will be represented as a string.
        # It will display the employee_id followed by their full name.
        return f"{self.employee_id} - {self.first_name} {self.last_name}"

# Function to generate the custom employee ID
def generate_employee_id(instance):
    # Retrieve the last employee record, ordered by employee_id in descending order.
    # This assumes employee_id format is like 'E0001', 'E0002', etc.
    last_employee = Employee.objects.order_by('-employee_id').first()

    if last_employee:
        # If there are existing employees:
        # Extract the numeric part of the last ID (e.g., from 'E0001', get '0001').
        # Then convert it to an integer.
        last_id_num = int(last_employee.employee_id[1:]) # Ignore 'E' and convert to integer
        # Increment the number to get the next ID number.
        new_id_num = last_id_num + 1
    else:
        # If this is the very first employee being created, start the sequence from 1.
        new_id_num = 1

    # Format the new number to always have 4 digits, padding with leading zeros if necessary.
    # For example, 1 becomes '0001', 15 becomes '0015'.
    # Prepend 'E' to create the final ID string (e.g., 'E0001').
    return f"E{new_id_num:04d}"

# Use a pre_save signal to generate the ID before the object is saved to the database.
@receiver(pre_save, sender=Employee)
def set_employee_id(sender, instance, **kwargs):
    # Check if the 'employee_id' field is currently empty (None or blank).
    if not instance.employee_id:
        # If it's empty, call the generate_employee_id function to create a new ID
        # and assign it to the instance's employee_id field.
        instance.employee_id = generate_employee_id(instance)