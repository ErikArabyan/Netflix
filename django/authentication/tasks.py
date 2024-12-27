from datetime import timedelta, timezone
from django.contrib.auth.models import User
from .models import *
from celery import shared_task
from django.core.mail import EmailMessage
from django.conf.global_settings import EMAIL_HOST_USER
from Film.celery import app


@app.task(queue='email_queue', max_retries=3, rate_limit='10/s')
def send_email(email, verification_code):
        mail = EmailMessage(
            subject='Password Reset on Netflix',
            body=f"This is your verification code: {verification_code}",
            from_email=EMAIL_HOST_USER,
            to=[email],
        )
        mail.send()
        return 'mail send successfully'


@app.task(queue='email_queue', max_retries=3, rate_limit='10/s')
def delete_user(email):
    try:
        user = User.objects.get(email=email)
        user.delete()
    except User.DoesNotExist:
        pass
