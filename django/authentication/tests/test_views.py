from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from authentication.tasks import delete_user
from ..models import User
from rest_framework.authtoken.models import Token
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator


class MyTestClass(TestCase):
    email = 'arabyanerik12@gmail.com'
    not_registered_email = 'test_invalid@mail.ru'
    incorrect_email = 'test_invalidmailru'
    password = 'testpass123'
    first_name = 'testfirstname'
    last_name = 'testlastname'
    invalid_token = 'invalid_token'
    code = '1111'
    invalid_code = '2222'

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(
            email=cls.email, password=cls.password, verification_code=cls.code)
        cls.token, _ = Token.objects.get_or_create(user=cls.user)
        cls.res = delete_user.apply_async((cls.user.email,), countdown=60)


class TestLogin(MyTestClass):
    def setUp(self):
        self.url = reverse('login')

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        test_data = {'email': self.email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 200)

    def test_invalid(self):
        test_data = {'email': self.not_registered_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 401)

    def test_incorrect(self):
        test_data = {'email': self.incorrect_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)


class TestRegister(MyTestClass):
    def setUp(self):
        self.url = reverse('register')

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_valid(self):
        response = self.client.post(self.url, data={
                                    'email': self.not_registered_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 201)

    def test_existing(self):
        response = self.client.post(self.url, data={
                                    'email': self.email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 403)

    def test_incorrect(self):
        test_data = {'email': self.incorrect_email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)


class TestLogout(MyTestClass):
    def setUp(self):
        self.url = reverse('logout')

    def test_not_allowed_method(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token.key)
        self.assertEqual(response.status_code, 202)

    def test_invalid(self):
        response = self.client.get(
            self.url, HTTP_AUTHORIZATION=self.invalid_token)
        self.assertEqual(response.status_code, 404)


class TestVerifyEmail(MyTestClass):
    def setUp(self):
        self.url = reverse('verify_email')

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.post(self.url, data={
                                    'email': self.email, 'code': self.code, 'task': self.res.id})
        self.assertEqual(response.status_code, 202)

    def test_too_many_requests(self):
        for i in range(4):
            response = self.client.post(self.url, data={
                'email': self.email, 'code': self.invalid_code, 'task': self.res.id})
        self.assertEqual(response.status_code, 429)

    def test_invalid_request(self):
        response = self.client.post(self.url, data={
            'email': self.email, 'code': self.invalid_code, 'task': self.res.id})
        self.assertEqual(response.status_code, 400)

    def test_not_registered_email(self):
        response = self.client.post(self.url, data={
            'email': self.incorrect_email, 'code': self.code, 'task': self.res.id})
        self.assertEqual(response.status_code, 400)

    def test_user_not_found(self):
        response = self.client.post(self.url, data={
            'email': self.not_registered_email, 'code': self.code, 'task': self.res.id})
        self.assertEqual(response.status_code, 417)


class TestGetUser(MyTestClass):
    def setUp(self):
        self.url = reverse('get_user')

    def test_not_allowed_method(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.get(self.url, headers={
            'Authorization': self.token.key})
        self.assertEqual(response.status_code, 202)

    def test_no_token(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 400)

    def test_invalid_token(self):
        response = self.client.get(self.url, headers={
            'Authorization': self.invalid_token})
        self.assertEqual(response.status_code, 404)


class TestPasswordReset(MyTestClass):
    def setUp(self):
        self.url = reverse('password_reset')

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.post(self.url, data={
            'email': self.email})
        self.assertEqual(response.status_code, 200)

    def test_not_registered_email(self):
        response = self.client.post(self.url, data={
            'email': self.not_registered_email})
        self.assertEqual(response.status_code, 401)

    def test_incorrect_email(self):
        response = self.client.post(self.url, data={
            'email': self.incorrect_email})
        self.assertEqual(response.status_code, 400)


class TestPasswordResetConfirm(MyTestClass):
    def setUp(self):
        self.invalid_password = '1'
        self.user1 = User.objects.create_user(
            email='test1@example.com', password='old_password')
        self.uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        self.uid1 = urlsafe_base64_encode(force_bytes(self.user1.pk))
        self.token = default_token_generator.make_token(self.user)
        self.token1 = default_token_generator.make_token(self.user1)
        self.url = reverse('password_reset_confirm', kwargs={
                           'uidb64': self.uid, 'token': self.token})
        self.invalid_uid_url = reverse('password_reset_confirm', kwargs={
                                       'uidb64': self.uid1, 'token': self.token})
        self.invalid_token_url = reverse('password_reset_confirm', kwargs={
                                         'uidb64': self.uid, 'token': self.token1})

    def test_valid(self):
        response = self.client.post(self.url, data={'password': self.password})
        self.assertEqual(response.status_code, 200)

    def test_invalid_password(self):

        response = self.client.post(
            self.url, data={'password': self.invalid_password})
        self.assertEqual(response.status_code, 400)

    def test_invalid_uid(self):
        response = self.client.post(self.invalid_uid_url, data={
                                    'password': self.password})
        self.assertEqual(response.status_code, 401)

    def test_invalid_token(self):
        response = self.client.post(self.invalid_token_url, data={
                                    'password': self.password})
        self.assertEqual(response.status_code, 401)
