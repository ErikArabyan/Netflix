from django.apps import AppConfig


class SingletoneConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'singletone'
