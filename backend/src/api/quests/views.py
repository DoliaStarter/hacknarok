import json
import math

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from src.models import *

EARTH_RADIUS = 6371
DISTANCE_CONST = 0.005

def index(request):
    context = {}
    return render(request, '', context)


@csrf_exempt
def isOnPoint(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        user_coord = (json_data["long"], json_data["lat"])
        for point in QuestPoint.objects.all():
            
            base_coord = (point.longitude, point.latitude)
            d_lambda = user_coord[0]-base_coord[0]
            d_fi = user_coord[1]-base_coord[1]

            if(EARTH_RADIUS*math.sqrt(math.sin(d_fi)**2 + math.sin(d_fi)**2) < DISTANCE_CONST):
                return JsonResponse({"isSuccess" : True})

        return JsonResponse({"isSuccess" : False})

@csrf_exempt
def isInRadius(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        radius = json_data["range"]/1000
        user_coord = (json_data["long"], json_data["lat"])
        for point in QuestPoint.objects.all():
            
            base_coord = (point.longitude, point.latitude)
            d_lambda = math.abs(user_coord[0]-base_coord[0])
            d_fi = math.abs(user_coord[1]-base_coord[1])
            if(EARTH_RADIUS*math.sqrt(math.sin(d_fi)**2 - math.sin(d_fi)**2) < radius):
                return JsonResponse({"isSuccess" : True})

        return JsonResponse({"isSuccess" : False})

def questFromJSON(quest):
    return{
        'id': quest.id,
        'title': quest.title,
        'description': quest.description,
        'creator': quest.creator.login,
        'creatorId': quest.creator.id,
        'gamesCount': 10
    }

@csrf_exempt
def getPoint(request, id):
    point = QuestPoint.objects.get(id=id)
    return JsonResponse({
        'title':point.title,
        'quest':questFromJSON(point.quest)
        })


# 

@csrf_exempt
def quest_search(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        substring = json_data.setdefault("title", '')
        quests = Quest.objects.filter(title__contains=substring).all()
        item_count = len(quests)
        return JsonResponse({

            'quests': [questFromJSON(quest) for quest in quests],

            'itemCount': item_count})


def _get_user_and_quest_POST(request):
    json_data = json.loads(request.body)
    user = json_data["user"]
    started_quest = json_data["quest"]
    return user, started_quest


@csrf_exempt
def start_session(request, id):
    started_quest = Quest.objects.get(id=id)
    if request.method == 'POST':
        json_data = json.loads(request.body)
        login = json_data["login"]
        Sessions(user=User.objects.get(login=login), \
            quest=started_quest).save()
        return HttpResponse("True")
    return HttpResponse("False")


@csrf_exempt
def deleteQuest(request, id):
    if request.method == 'DELETE':
        quest = Quest.objects.filter(id=id)
        if quest:
            quest.delete()
            return HttpResponse("Deleted")
        return HttpResponse("No such id")


@csrf_exempt
def get_quest_model(request, id):
    quest_to_return = Quest.objects.get(id=id)
    print(quest_to_return)
    q_title = quest_to_return.title
    q_creator = quest_to_return.creator
    q_creator_id = q_creator.id
    q_creator = q_creator.login
    q_games_count = 10  # Quest.join(Sessions.quest).user.count()
    q_description = quest_to_return.description
    q_points = [dictFromPoint(point) for point in  QuestPoint.objects.filter(quest=quest_to_return)]
    return JsonResponse({
        'id': id,
        'title': q_title,
        'creatorId': q_creator_id,
        'creator': q_creator,
        'gamesCount': q_games_count,
        'description': q_description,
        'points': q_points

    })

def dictFromPoint(point):
    return {
        'status': point.status,
        'title': point.title,
        'description': point.description,
        'lati': point.latitude,
        'long': point.longitude,
        'pointId': point.id
    }

@csrf_exempt
def get_quest_point_model(request, id):
    quest_point_to_return = QuestPoint.objects.filter(id=id)
    qp_status = quest_point_to_return.status
    qp_description = quest_point_to_return.description
    qp_title = quest_point_to_return.title
    bp_lati = quest_point_to_return.latitude
    bp_long = quest_point_to_return.longitude
    return JsonResponse({
        'status': qp_status,
        'description': qp_description,
        'title': qp_title,
        'pointId': id,
        'lati': bp_lati,
        'long': bp_long,

    })


def _getQuestFromPOST(request):
    json_data = json.loads(request.body)
    title = json_data["title"]
    #creator = json_data["creator"]
    # creator_id = json_data["creator_id"]
    creator_id = 1
    description = json_data["description"]
    points = json_data["points"]
    return title, creator_id, description, points


@csrf_exempt
def quest(request):
    if request.method == 'POST':
        title, creator_id, description, points = _getQuestFromPOST(request)
        creator = User.objects.filter(id=creator_id)[0]
        thisQuest = Quest(title=title, creator=creator, description=description)
        thisQuest.save()
        for point in points:
            quest = QuestPoint(status=point.setdefault('status', ''), \
                        title=point.setdefault('title', ''), \
                        description=point.setdefault('description', ''), \
                        latitude=point.setdefault('lati', ''), \
                        longitude=point.setdefault('long', ''), \
                        quest=thisQuest)
            quest.save()
        return HttpResponse(JsonResponse({'message':'Successfully created'}))
    else:
        quest_list_model = list(Quest.objects.order_by('title'))
        item_count = Quest.objects.count()
        return JsonResponse({
            'quests': quest_list_model,
            'itemCount': item_count})
