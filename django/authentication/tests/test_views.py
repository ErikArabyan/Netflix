from django.test import TestCase
from django.urls import reverse
from ..models import User


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

    def test_valid_login(self):
        test_data = {'email': self.email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 200)

    def test_invalid_login(self):
        test_data = {'email': self.invalid_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 401)

    def test_incorrect_login(self):
        test_data = {'email': self.incorrect_email,
                     'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)


class TestRegisterView(TestCase):
    def setUp(self):
        self.url = reverse('register')
        self.email = 'test@mail.ru'
        self.real_email = 'test@mail.ru'
        self.incorrect_email = 'test_invalidmailru'
        self.password = 'testpass123'
        self.first_name = 'testfirstname'
        self.last_name = 'testlastname'
        
    def test_not_allowed_method(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 405)

    def test_register_valid(self):
        url = reverse('register')
        response = self.client.post(url, data={
                                    'email': self.real_email, 'password': self.password, 'first_name': self.first_name, 'last_name': self.last_name})
        self.assertEqual(response.status_code, 201)

    def test_invalid_register(self):
        test_data = {'email': self.incorrect_email, 'password': self.password}
        response = self.client.post(self.url, data=test_data)
        self.assertEqual(response.status_code, 400)
