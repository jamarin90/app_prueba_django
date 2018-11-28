from django.contrib.auth.models import User
from django.test import TestCase

# Create your tests here.

def test_user_creation(self):
    User(email="prueba@prueba.com", name='prueba user').save()

    users = User.objects.all()
    self.assertEquals(users.count(), 1)