from django.urls import path, include
from .views import *
from django.contrib.auth import views

urlpatterns = [
    path("login/", login, name="login"),
    path("register/", register, name="register"),
    path("verify_email/", verify_email, name="verify_email"),
    path("logout/", logout, name="logout"),
    path('getuser/', get_user, name='get_user'),
    path("password_change/", password_reset, name="password_change"),
    path('reset/<uidb64>/<token>/', password_change, name='password_reset_confirm'),
    path('google/<backend>/', google_login, name='google_login'),
    path('', include('social_django.urls', namespace='social'))
]