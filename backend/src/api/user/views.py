from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login
from src.models import User, Sessions


def getAciveQuests(request, id):
    sessions = Sessions.objects\
        .filter(user=User.objects.get(id=id))
    return JsonResponse({
        'quests': [session.quest.title for session in sessions]
    })

def register(request):
    if request.method == 'POST':
        login=request.POST['login']
        password=request.POST['password'] 
        if (login not in [user.login for user in User.objects.all()]):
            newUser = User(login,password)
            newUser.save()
        else:
            raise "Here is such user"


def sign_in(request):
    if request.method == 'POST':
        login=request.POST['login']
        password=request.POST['password'] 
        if (login in [user.login for user in User.objects.all()] and \
            password in [user.password for user in User.objects.all()]):
            return True
        return False
