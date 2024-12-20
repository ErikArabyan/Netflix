from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Enter an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user
    
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    verification_code = models.IntegerField('Verification code', editable=False, null=True, blank=True)
    trycount = models.IntegerField('verification code tryed', default=0)
    image = models.ImageField("Profile Image", default='profile_images/profile_default.png',)
    email = models.EmailField("email address", blank=False, unique=True)
    is_director = models.BooleanField('Is director', default=False)
    is_distributor = models.BooleanField('Is distributor', default=False)
    is_art_director = models.BooleanField('Is art director', default=False)
    is_editor = models.BooleanField('Is editor', default=False)
    rating = models.FloatField('User Rate', default=0)
    username = models.CharField('username', default='user', max_length=128, null=False, blank=False)
    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    
    def __str__(self):
        return str(self.first_name+' '+self.last_name)