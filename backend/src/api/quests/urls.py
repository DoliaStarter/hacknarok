from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.quest, name='questList'),
    path('search', views.quest_search, name='questSearch'),
    path('<int:id>/', views.get_quest_model, name='quest'),
    path('<int:id>/delete', views.deleteQuest, name='delete_quest'),
    path('is-on-point', views.isOnPoint, name='isOnPoint'),
    path('is-in-radius', views.isInRadius, name='isInRadius'),
    path('<int:id>/start', views.start_session, name='start_session'),
]
