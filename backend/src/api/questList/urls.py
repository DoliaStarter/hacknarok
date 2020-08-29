from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('questList/', include('src.api.questList.urls')), ]
