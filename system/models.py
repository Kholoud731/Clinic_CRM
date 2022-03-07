from django.db import models
from django.contrib.auth.models import User

# weekly working hours 
class WorkingHour(models.Model):
    DAY_CHOICES = (
    ("Saturday", "Saturday"),
    ("Sunday", "Sunday"),
    ("Monday", "Monday"),
    ("Tuesday", "Tuesday"),
    ("Wednesday", "Wednesday"),
    ("Thursday", "Thursday"),
    ("Friday", "Friday")
    )
    day = models.CharField(max_length=32,choices=DAY_CHOICES, unique=True)
    start_time = models.TimeField(auto_now=False, auto_now_add=False, blank=True, null=True)
    end_time = models.TimeField(auto_now=False, auto_now_add=False , blank=True, null=True)


    def __str__(self):
        return self.day
    



# all appointments connected to user
class Appointment(models.Model):
    STATUS_CHOICES = (
    ("Wating", "Wating"),
    ("Approved", "Approved"),
    ("Canceled", "Canceled"),
    ("Missed", "Missed"),
    ("Finished", "Finished")
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    appointment_time = models.DateTimeField(unique=True)
    status = models.CharField(max_length=32,choices=STATUS_CHOICES)
    reschedule = models.BooleanField(default=False)

    def __str__(self):
        return str(self.appointment_time)
    
    class Meta:
        ordering = ['appointment_time']