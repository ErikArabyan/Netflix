from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Устанавливаем default настройки для Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Film.settings')

app = Celery('Film')

# Загружаем конфигурацию из настроек Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматически искать задачи в зарегистрированных Django приложениях
app.autodiscover_tasks()
