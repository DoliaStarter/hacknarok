from django.http import JsonResponse
from django.shortcuts import render


def index(request):
    context = {}
    return render(request, '', context)

def active_quests(request):
    return JsonResponse({
        'active_quests': 'value'
    })
