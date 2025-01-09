from .serializers import SmallUserSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import User
from rest_framework.authtoken.models import Token


def get_or_create_user(payload):
    email = payload.get('email')
    user, created = User.objects.get_or_create(username=email, defaults={
        'first_name': payload.get('given_name', ''),
        'last_name': payload.get('family_name', ''),
        'image': payload.get('picture', ''),
        'email': email
    })
    serializer = SmallUserSerializer(user)
    Token.objects.update_or_create(user=user, defaults={'key': payload.get('sub')})
    return Response(data={'user': serializer.data}, status=status.HTTP_202_ACCEPTED)
