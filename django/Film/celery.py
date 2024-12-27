from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from kombu import Queue


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Film.settings')

app = Celery('Film', broker='redis://localhost:6379/0')

app.conf.timezone = 'Asia/Yerevan'

app.conf.task_queues = (
    Queue('email_queue'),
    # Queue('email_queue'),
    Queue('default'),
)

app.autodiscover_tasks()
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.update(
    task_track_started=True,
    worker_log_color=False,
    task_time_limit=20,
    worker_concurrency=1,
)
