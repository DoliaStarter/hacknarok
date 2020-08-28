from django.contrib import admin
from django.urls import include, path

from . import logic

urlpatterns = [
    path('example', logic.example)
]
