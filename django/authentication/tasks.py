from .models import *
from celery import shared_task
from django.core.mail import EmailMessage
from django.conf.global_settings import EMAIL_HOST_USER

@shared_task
def send_email(email, verification_code):
    mail = EmailMessage(
        subject='Password Reset on Netflix',
        body=f"This is your verification code: {verification_code}",
        from_email=EMAIL_HOST_USER,
        to=[email],
    )
    mail.send()
