from django.test import TestCase
from django.urls import reverse
from ..models import User
from rest_framework.authtoken.models import Token


class TestLoginView(TestCase):
    def setUp(self):
        self.url = reverse('login')
        self.email = 'test@mail.ru'
        self.password = 'testpass123'
        self.invalid_email = 'test_invalid@mail.ru'
        self.incorrect_email = 'test_invalidmailru'
        self.user = User.objects.create_user(
            email=self.email, password=self.password)

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        test_data = {'email': self.email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 200)

    def test_invalid(self):
        test_data = {'email': self.invalid_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 401)

    def test_incorrect(self):
        test_data = {'email': self.incorrect_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)


class TestRegisterView(TestCase):
    def setUp(self):
        self.url = reverse('register')
        self.email = 'test@mail.ru'
        self.real_email = 'arabyanerik12@gmail.com'
        self.existing_user_email = 'existing@gmail.com'
        self.incorrect_email = 'test_invalidmailru'
        self.password = 'testpass123'
        self.first_name = 'testfirstname'
        self.last_name = 'testlastname'
        self.user = User.objects.create_user(
            email=self.existing_user_email, password=self.password)

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.post(self.url, data={
                                    'email': self.real_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 201)

    def test_existing(self):
        response = self.client.post(self.url, data={
                                    'email': self.existing_user_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 403)

    def test_incorrect(self):
        test_data = {'email': self.incorrect_email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)


class TestLogoutView(TestCase):
    def setUp(self):
        self.url = reverse('logout')
        self.email = 'test@mail.ru'
        self.password = 'testpass123'
        self.user = User.objects.create_user(email=self.email, password=self.password)
        self.token, _ = Token.objects.get_or_create(user=self.user)
        self.invalid_token = 'invalid_token'

    def test_not_allowed_method(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token.key)
        self.assertEqual(response.status_code, 202)

    def test_invalid(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.invalid_token)
        self.assertEqual(response.status_code, 404)


# HTTP_202_ACCEPTED HTTP_429_TOO_MANY_REQUESTS HTTP_400_BAD_REQUEST HTTP_417_EXPECTATION_FAILED
class TestVerifyEmailView(TestCase):
    def setUp(self):
        self.url = reverse('register')
        self.email = 'test@mail.ru'
        self.real_email = 'arabyanerik12@gmail.com'
        self.existing_user_email = 'existing@gmail.com'
        self.incorrect_email = 'test_invalidmailru'
        self.password = 'testpass123'
        self.first_name = 'testfirstname'
        self.last_name = 'testlastname'
        self.user = User.objects.create_user(
            email=self.existing_user_email, password=self.password)

    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_valid(self):
        response = self.client.post(self.url, data={
                                    'email': self.real_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 201)

    def test_existing(self):
        response = self.client.post(self.url, data={
                                    'email': self.existing_user_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 403)

    def test_incorrect(self):
        test_data = {'email': self.incorrect_email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)
