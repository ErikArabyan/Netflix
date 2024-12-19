from django.db import models
from authentication.models import User

class Payment(models.Model):
    checkout_session_id = models.CharField('checkout_session_id', max_length=255)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
