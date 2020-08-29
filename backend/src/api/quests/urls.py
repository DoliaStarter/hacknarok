from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.quest, name='questList'),
    path('<int:id>/', views.get_quest_model, name='quest'),
    path('<int:id>/answers', views.get_base_point_model, name='basePoint'),
]
