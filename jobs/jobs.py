from django.conf import settings
from system.models import Appointment
from django.core.mail import send_mail
from django.contrib.auth.models import User
import datetime

def email_notification():
    appointments = Appointment.objects.all()
    date = datetime.now()
    for app in appointments:
        # print(app.created_by)
        user = User.objects.get(username =app.created_by )
        print(user.email)
        print(appointments['appointment_time'])
        if appointments['appointment_time'].hour - date.hour == 23:
            send_mail(
            subject="Your appointment",
            message=f"Hello {app.created_by} is tomorrow",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)
        elif appointments['appointment_time'].hour - date.hour == 6:
            send_mail(
            subject="Your appointment in 6 hours",
            message=f"Hello {app.created_by} Your appointment in 6 hours",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)
        elif appointments['appointment_time'].hour - date.hour == 0:
            send_mail(
            subject="Your appointment is now",
            message=f"Hello {app.created_by} Your appointment is now",
            from_email="kholoud.talaat93@gmail.com",
            recipient_list=[f'{user.email}'],
            fail_silently=False)