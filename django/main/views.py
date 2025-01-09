from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.decorators import APIView, api_view
from rest_framework.authtoken.models import Token


class HomeAPI(APIView):
    def get(self, request):
        films = Film.objects.all()
        genres = Genre.objects.all()
        film_serializer = FilmSerializer(films, many=True)
        genre_serializer = GenreSerializer(genres, many=True)
        data = {"film": film_serializer.data, "genre": genre_serializer.data}
        return Response(data, status=status.HTTP_200_OK)


class FilmDetail(APIView):
    def get(self, request, id, film):
        serializer_class = FilmDetailSerializer
        try:
            filmobject = Film.objects.get(id=id)
            serializer = serializer_class(filmobject)
            return Response(status=status.HTTP_200_OK, data={'film': serializer.data})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['post'])
def rate(request):
    film = request.data.get('film_id')
    film = Film.objects.get(id=film)
    ratenum = request.data.get('rate')
    token_key = request.headers.get('Authorization').replace('Token ', '')
    token = Token.objects.get(key=token_key)
    user = token.user
    try:
        Rate.objects.create(user=user, film=film, rated=ratenum)
        return Response(data={'message': 'Rated'}, status=status.HTTP_201_CREATED)
    except:
        rate = Rate.objects.get(user=user, film=film)
        rate.rated = ratenum
        rate.save()
        return Response(data={'message': 'Rate changed'}, status=status.HTTP_200_OK)
