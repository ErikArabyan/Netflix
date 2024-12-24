from django.shortcuts import render
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.mail import EmailMessage
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.conf.global_settings import EMAIL_HOST_USER
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator as token_generator
from random import randint


@api_view(['post'])
@permission_classes([AllowAny])
def login(request):
    serializer_class = LoginSerializer(data=request.data)
    if serializer_class.is_valid():
        username = serializer_class.validated_data['email']
        password = serializer_class.validated_data['password']
        auth = authenticate(username=username, password=password)
        if auth is not None:
            token, _ = Token.objects.get_or_create(user=auth)
            return Response(status=status.HTTP_200_OK, data={'token': token.key})
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={'error': 'User not found'})
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': serializer_class.errors})


@api_view(['get'])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.user:
        request.user.auth_token.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['post'])
@permission_classes([AllowAny])
def register(request):
    serializer_class = RegisterSerializer(data=request.data)
    if serializer_class.is_valid(): 
        email = serializer_class.validated_data['email']
        user = serializer_class.save()
        mail = EmailMessage(
            subject='Password Reset on Netflix',
            body=f"This is your verification code: {user.verification_code}",
            from_email=EMAIL_HOST_USER,
            to=[email],
        )
        mail.send()
        return Response(data={'message': email}, status=status.HTTP_201_CREATED)
    else:
        return Response(data={'error': serializer_class.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['post'])
@permission_classes([AllowAny])
def verify_email(request):
    code = request.data.get('verification_code')
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
        if str(user.verification_code) == code.strip():
            user.verification_code = None
            user.trycount = 0
            user.is_active = True
            user.save()
            return Response(data={"message": "Your email has been verified successfully!"}, status=status.HTTP_202_ACCEPTED)
        else:
            user.trycount += 1
            user.save()
            if user.trycount == 4:
                user.delete()
                return Response(data={"error": "You have reached the attempt limit"}, status=status.HTTP_429_TOO_MANY_REQUESTS)
            return Response(data={"error": "invalid verification code"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response(data={'error': 'User Not Found'}, status=status.HTTP_417_EXPECTATION_FAILED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer_class = SmallUserSerializer
    token_key = request.headers.get('Authorization').replace('Token ', '')
    if not token_key:
        return Response(data={'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        token = Token.objects.get(key=token_key)
        user = token.user
        serializer = serializer_class(user)
        return Response(data={'user': serializer.data}, status=status.HTTP_202_ACCEPTED)
    except Token.DoesNotExist:
        return Response(data={'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset(request):
    email = request.data.get('email')
    if not email:
        return Response(data={'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(data={'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = PasswordResetTokenGenerator().make_token(user)

    context = {'uidb64': uidb64, 'token': token,
               'host_name': 'http://127.0.0.1:3000'}
    html_content = render_to_string('password_reset_email.html', context)

    mail = EmailMessage(
        subject='Password Reset on Netflix',
        body=html_content,
        from_email=EMAIL_HOST_USER,
        to=[email],
    )
    mail.content_subtype = "html"
    mail.send()
    return Response(data={'message': 'Password reset email sent'}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_change(request, uidb64, token):
    uid = urlsafe_base64_decode(uidb64).decode()
    try:
        user = User.objects.get(pk=uid)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    reset_url_token = "set-password"
    INTERNAL_RESET_SESSION_TOKEN = "_password_reset_token"

    if user is not None:
        if token == reset_url_token:
            session_token = request.session.get(INTERNAL_RESET_SESSION_TOKEN)
            if token_generator.check_token(user, session_token):
                # If the token is valid, display the password reset form.
                return Response(status=status.HTTP_200_OK)
        else:
            if token_generator.check_token(user, token):
                # Store the token in the session and redirect to the
                # password reset form at a URL without the token. That
                # avoids the possibility of leaking the token in the
                # HTTP Referer header.
                password = request.data.get('password')
                user.set_password(password)
                user.save()
                auth_user = authenticate(
                    username=user.email, password=password)
                if auth_user is None:
                    return Response(status=status.HTTP_401_UNAUTHORIZED, data={'error': 'Authentication failed'})
                token, _ = Token.objects.get_or_create(user=auth_user)
                request.session[INTERNAL_RESET_SESSION_TOKEN] = token.key
                return Response(status=status.HTTP_200_OK, data={'message': token.key})

    return Response(status=status.HTTP_404_NOT_FOUND)
