from pathlib import Path
from os import getenv
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = getenv("DJANGO_SECRET_KEY")
DEBUG = True
ALLOWED_HOSTS = ['*']
ROOT_URLCONF = 'Film.urls'
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # third party libraries
    'rest_framework.authtoken',
    'rest_framework',
    'corsheaders',
    'django_celery_beat',
    'channels',

    # apps
    'authentication.apps.AuthenticationConfig',
    'main.apps.MainConfig',
    'payments.apps.PaymentsConfig',
    'singletone.apps.SingletoneConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Film.wsgi.application'
ASGI_APPLICATION = 'Film.asgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# database settings
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': getenv('DJANGO_DATABASE_NAME'),
        'USER': getenv('DJANGO_DATABASE_USER'),
        'PASSWORD': getenv('DJANGO_DATABASE_PASSWORD'),
        'HOST': getenv('DJANGO_DATABASE_HOST'),
        'PORT': getenv('DJANGO_DATABASE_PORT'),
    }
}
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# static and media file roots
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "authentication.User"

# CORS settings
CORS_ALLOWED_ORIGINS = [
    # 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://192.168.1.213:3000'
    'https://127.0.0.1:3000', 'https://localhost:3000', "https://192.168.1.213:3000", 'https://accounts.google.com'
]

# Email SMTP settings
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = getenv('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Stripe Payment settings
STRIPE_PUBLISHABLE_KEY = 'pk_test_51QX0yBIO5AXqdrLmXks5vubS0TKp7mQ7JqTxZdJPodYKVNP6cBwNC9T1h51YsMjw6kPePcogYZqHPEOdJUUGnlhe00D5DKDqv1'
STRIPE_SECRET_KEY = getenv('STRIPE_SECRET_KEY')


# Celery settings
CELERY_TIMEZONE = 'Asia/Yerevan'
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_RESULT_EXTENDED = True
CELERY_BROKER_CONNECTION_RETRY_ON_STARTUP = True
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers.DatabaseScheduler'

# CELERY_BEAT_SCHEDULE = {
#     "sample_task": {
#         "task": "core.tasks.sample_task",
#         "schedule": crontab(minute="*/1"),
#     },
# }

# Google Authentication
GOOGLE_CLIENT_ID = '97173424287-mr88917mp74110bl0so2a4un1gmorq0h.apps.googleusercontent.com'

# Channels settings
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            'hosts': [('127.0.0.1', 6379)],
        },
    },
}
