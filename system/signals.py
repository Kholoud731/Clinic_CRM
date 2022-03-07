from django.core.mail import send_mail
from django.db.models.signals import post_save, post_delete
from django.contrib.auth.models import User
from django.dispatch import receiver


# deleted for practise onle 
@receiver(post_delete, sender=User)
def notify_admin(signal,sender,instance,using,*args, **kwargs):
    send_mail(
    subject="User deleted",
    message=f"The movie {instance.username} has been deleted",
    from_email="kholoud.talaat93@gmail.com",
    recipient_list=['kholoud.talaat93@gmail.com'],
    fail_silently=False)