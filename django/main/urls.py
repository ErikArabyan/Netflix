from django.urls import path
from .views import *
from payments.views import success

urlpatterns = [
    path('', HomeAPI.as_view()),
    path('<int:id>/<str:film>/', FilmDetail.as_view(), name='filmdetail'),
    path('rate/', rate),
    path('success/', success, name='success'),
]