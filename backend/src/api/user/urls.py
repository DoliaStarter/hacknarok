from django.contrib import admin
from django.urls import include, path
from src.api.user import views

urlpatterns = [
    path('register', views.register), 
    path('login', views.sign_in),
    path('<int:id>/active_quests', views.getAciveQuests)
    ]
