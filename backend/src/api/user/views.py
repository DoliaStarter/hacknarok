import json

from django.contrib.auth import authenticate, login
from django.http import (Http404, HttpResponse, HttpResponseRedirect,
                         JsonResponse)
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from src.models import Sessions, User


def getAciveQuests(request, id):
    sessions = Sessions.objects \
        .filter(user=User.objects.get(id=id))
    return JsonResponse({
        'quests': [{

            'id': sessions.quest.id,
            'title': sessions.quest.title

        } for ssession in sessions]
    })


def _getLoginPasswordFromPOST(request):
    json_data = json.loads(request.body)
    login = json_data["login"]
    password = json_data["password"]
    return login, password


@csrf_exempt
def register(request):
    if request.method == 'POST':
        login, password = _getLoginPasswordFromPOST(request)
        if (login not in [user.login for user in User.objects.all()]):
            newUser = User(login=login,password=password)
            newUser.save()
            return JsonResponse({'isSuccess': True})
        return JsonResponse({'isSuccess': False})

@csrf_exempt
def sign_in(request):
    if request.method == 'POST':
        login, password = _getLoginPasswordFromPOST(request)
        if (login in [user.login for user in User.objects.all()] and \
            password in [user.password for user in User.objects.all()]):
            return JsonResponse({'isSuccess': True})
        return JsonResponse({'isSuccess': False})
