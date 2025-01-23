import json
import requests
from singletone.models import SingletoneModel
from .tasks import *
from .serializers import *
from .utils import *
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from jwt import get_unverified_header, decode, get_unverified_header
from jwt.algorithms import RSAAlgorithm
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator as token_generator
from celery.result import AsyncResult
from re import match
from django.contrib.auth.password_validation import validate_password



@api_view(['post'])
def loginview(request):
    serializer_class = LoginSerializer(data=request.data)
    if serializer_class.is_valid():
        username = serializer_class.validated_data['email']
        password = serializer_class.validated_data['password']
        auth = authenticate(username=username, password=password)
        if auth is not None:
            token, _ = Token.objects.get_or_create(user=auth)
            return Response(status=status.HTTP_200_OK, data=token.key)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED, data={'error': 'User not found'})
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'error': serializer_class.errors})


@api_view(['get'])
def logout(request):
    try:
        token_key = request.headers.get('Authorization')
        Token.objects.get(key=token_key).delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['post'])
def register(request):
    serializer_class = RegisterSerializer(data=request.data)
    if serializer_class.is_valid():
        email = serializer_class.validated_data['email']
        try:
            user = serializer_class.save()
            send_registration_email.delay(
                email=email, verification_code=user.verification_code)
            res = delete_user.apply_async((user.email,), countdown=60)
            return Response(data={'message': 'Registration successful. A verification email has been sent.', 'task': res.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data={'error': f"Registration failed: {str(e)}"}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response(data={'error': serializer_class.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['post'])
def verify_email(request):
    code = request.data.get('code')
    email = request.data.get('email')
    task_id = request.data.get('task')
    try:
        if match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email) is not None:
            user = User.objects.get(email=email)
        else:
            return Response(data={'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
        if str(user.verification_code) == code.strip():
            result = AsyncResult(task_id)
            result.revoke(terminate=True)
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
def get_user(request):
    serializer_class = SmallUserSerializer
    token_key = request.headers.get('Authorization')
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
def password_reset(request):
    email = request.data.get('email')
    if not email or not (match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email) is not None):
        return Response(data={'error': 'Email is incorrect'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(data={'error': 'User not found'}, status=status.HTTP_401_UNAUTHORIZED)
    uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
    token = PasswordResetTokenGenerator().make_token(user)
    site_settings = SingletoneModel.load()
    site_url = site_settings.front_URL
    context = {'uidb64': uidb64, 'token': token, 'host_name': site_url}
    print(context)
    html_content = render_to_string('password_reset_email.html', context)
    print(html_content)
    send_password_reset_email.delay(email, html_content)
    return Response(data={'message': 'Password reset email sent'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def password_reset_confirm(request, uidb64, token):
    uid = urlsafe_base64_decode(uidb64).decode()
    INTERNAL_RESET_SESSION_TOKEN = "_password_reset_token"
    try:
        user = User.objects.get(pk=uid)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if token_generator.check_token(user, token):
        password = request.data.get('password')
        try:
            validate_password(password)
            user.set_password(password)
            user.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        auth_user = authenticate(
            username=user.email, password=password)
        token, _ = Token.objects.get_or_create(user=auth_user)
        request.session[INTERNAL_RESET_SESSION_TOKEN] = token.key
        return Response(status=status.HTTP_200_OK, data={'message': token.key})
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
def decode_and_verify_token(request):
    try:
        token = json.loads(request.body)['credential']
        unverified_header = get_unverified_header(token)
        if not token:
            return JsonResponse({"error": "Token is required"}, status=400)

        response = requests.get("https://www.googleapis.com/oauth2/v3/certs")
        jwks = response.json()
        kid = unverified_header.get('kid')
        rsa_key = next(
            (key for key in jwks['keys'] if key['kid'] == kid), None)

        decoded_token = decode(
            token,
            key=RSAAlgorithm.from_jwk(rsa_key),
            algorithms=[unverified_header['alg']],
            audience="97173424287-mr88917mp74110bl0so2a4un1gmorq0h.apps.googleusercontent.com",
            issuer="https://accounts.google.com"
        )
        get_or_create_user(decoded_token)
        return JsonResponse({"decoded_token": decoded_token}, status=200)
    except ExpiredSignatureError:
        return JsonResponse({"error": "Token has expired"}, status=401)
    except InvalidTokenError:
        return JsonResponse({"error": "Invalid token"}, status=400)
