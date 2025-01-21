from random import randint
from django.forms import ValidationError
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from authentication.models import User
from django.contrib.auth.hashers import make_password

class LoginSerializer(ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)
    class Meta:
        model = User
        fields = ['email', 'password']

class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(required=True)
    def validate(self, data):
        data['verification_code'] = randint(1000, 9999)
        data['is_active'] = False
        if 'password' in data:
            data['password'] = make_password(data['password'])
        else:
            raise ValidationError("Password is required.")
        return data
    class Meta:
        model = User
        fields = ['email', 'password', "first_name", "last_name"]
        
class SmallUserSerializer(ModelSerializer):
    image = serializers.CharField()
    username = serializers.CharField()
    email = serializers.CharField()
    class Meta:
        model = User
        fields = ['image', 'username', "email"]