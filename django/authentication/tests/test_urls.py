from django.test import TestCase
from django.urls import reverse, resolve
from ..views import *

class TestUrls(TestCase):
  def test_login (self):
    url = reverse("login")
    self.assertEqual(resolve(url).func, loginview)
  
  def test_register (self):
    url = reverse("register")
    self.assertEqual(resolve(url).func, register)
  
  def test_verify_email (self):
    url = reverse("verify_email")
    self.assertEqual(resolve(url).func, verify_email)
  
  def test_logout (self):
    url = reverse("logout")
    self.assertEqual(resolve(url).func, logout)
  
  def test_get_user (self):
    url = reverse("get_user")
    self.assertEqual(resolve(url).func, get_user)
  
  def test_token_actions (self):
    url = reverse("token_actions")
    self.assertEqual(resolve(url).func, decode_and_verify_token)
  
  def test_password_reset (self):
    url = reverse("password_reset")
    self.assertEqual(resolve(url).func, password_reset)
  
  def test_password_reset_confirm (self):
    url = reverse("password_reset_confirm", kwargs={"uidb64": "uidb64", "token": 'token'})
    self.assertEqual(resolve(url).func, password_reset_confirm)