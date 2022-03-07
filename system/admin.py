from django.contrib import admin
from .models import WorkingHour, Appointment

# Register your models here.
admin.site.register(WorkingHour)
admin.site.register(Appointment)