from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from authentication.models import User

class LoginSerializer(ModelSerializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['email', 'password']

class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'is_director', 'is_distributor', 'is_art_director', 'is_editor', "first_name", "last_name"]
        
class SmallUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['image', 'username']