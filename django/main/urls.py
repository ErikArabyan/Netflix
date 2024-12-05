from django.urls import path
from .views import *

urlpatterns = [
    path('', HomeAPI.as_view()),
    path('<int:id>/<str:film>/', FilmDetail.as_view(), name='filmdetail')
]