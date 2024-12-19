from django.urls import path
from .views import *

urlpatterns = [
    path('<int:id>/', create_checkout_session)
]

