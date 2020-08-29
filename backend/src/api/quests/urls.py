from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.quest, name='questList'),
<<<<<<< HEAD
    path('<int:id>', views.get_quest_model, name='quest'),
    #path('<int:id>/answers', views.get_base_point_model, name='basePoint'),
=======
    path('search', views.quest_search, name='questSearch'),
    path('<int:id>/', views.get_quest_model, name='quest'),
    path('<int:id>/answers', views.get_base_point_model, name='basePoint'),
>>>>>>> c0055d98801f5cc1b3000ca303e536f5eb604943
]
