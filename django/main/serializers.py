from rest_framework import serializers
from .models import *
from authentication.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'rating', 'first_name', 'last_name']

class UserForFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

class NominationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nomination
        fields = ['id', 'name']

class GenreSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation = instance.name
        return representation
    
    class Meta:
        model = Genre
        fields = ['name']

class FilmSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True)
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['genres'] = [f'{i.name}' for i in instance.genres.all()]
        return representation
    
    class Meta:
        model = Film
        fields = ['id', 'name', 'image', 'genres']


class FilmDetailSerializer(serializers.ModelSerializer):
    nominations = NominationsSerializer(many=True)
    directors = UserForFilmSerializer(many=True)
    distributed_by = UserForFilmSerializer(many=True)
    art_directors = UserForFilmSerializer(many=True)
    editors = UserForFilmSerializer(many=True)
    genres = GenreSerializer(many=True)
    film = serializers.StringRelatedField(many=True)
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['directors'] = [f'{i.first_name} {i.last_name}' for i in instance.directors.all()]
        representation['cinematography'] = [f'{i.name}' for i in instance.cinematography.all()]
        representation['distributed_by'] = [f'{i.first_name} {i.last_name}' for i in instance.distributed_by.all()]
        representation['art_directors'] = [f'{i.first_name} {i.last_name}' for i in instance.art_directors.all()]
        representation['editors'] = [f'{i.first_name} {i.last_name}' for i in instance.editors.all()]
        representation['nominations'] = [f'{i.name}' for i in instance.nominations.all()]
        representation['genres'] = [f'{i.name}' for i in instance.genres.all()]
        representation['film'] = [f'media/{i}' for i in instance.film.all()]
        return representation
    
    class Meta:
        model = Film
        fields = ['name', 'image', 'genres', 'directors', 'cinematography', 'distributed_by', 'art_directors', 'editors', 'rate', 'budget', 'release_date', 'film', 'nominations']
