from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.decorators import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

class HomeAPI(APIView):
    permission_classes  = [AllowAny]
    def get(self, request):
        films = Film.objects.all()
        genres = Genre.objects.all()
        film_serializer = FilmSerializer(films, many=True)
        genre_serializer = GenreSerializer(genres, many=True)
        data = {"film": film_serializer.data, "genre": genre_serializer.data}
        return Response(data, status=status.HTTP_200_OK)
    
class FilmDetail(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,id, film):
        serializer_class = FilmDetailSerializer
        try:
            filmobject = Film.objects.get(name = film,id=id)
            serializer = serializer_class(filmobject)
            return Response(status=status.HTTP_200_OK, data={'film': serializer.data})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)