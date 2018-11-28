from django.contrib import admin
from django.urls import path

from navidad.views import home

urlpatterns = [
    path('', home, name='index'),
]
