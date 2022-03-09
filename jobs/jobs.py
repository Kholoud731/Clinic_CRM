from django.conf import settings
from system.models import Appointment
from django.core.mail import send_mail
from django.contrib.auth.models import User
import datetime

def email_notification():
    # get all the appointments queryset to llop over 
    appointments = Appointment.objects.all()
    # get the time noe each time we run the job
    date = datetime.datetime.now()
   

    for app in appointments.iterator():
        # get appointment time to check with the current time
        app_date = app.appointment_time

        # get the user and the user email for each appointment  
        user = User.objects.get(username =app.created_by )

        if date.day == (app_date.day + 1) and (date.hour - app_date.hour) == 0:
            send_mail(
            subject="Your appointment",
            message=f"Hello {app.created_by} is tomorrow",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)

        if date.day == app_date.day and (date.hour - app_date.hour) == 6:
            send_mail(
            subject="Your appointment in 6 hours",
            message=f"Hello {app.created_by} Your appointment in 6 hours",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)

        if date.day == app_date.day and (date.hour - app_date.hour) == 0:
            send_mail(
            subject="Your appointment is now",
            message=f"Hello {app.created_by} Your appointment is now",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)


