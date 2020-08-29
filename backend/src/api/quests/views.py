from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from src.models import *
import json


def index(request):
    context = {}
    return render(request, '', context)


# def get_quest_list_model(request):
#
#     })

def quest_search(request):
    substring = request.GET['substring']
    quests = Quest.objects.filter(title__contains=substring).all()
    item_count = len(quests)
    return JsonResponse({
        'quests': quests,
        'itemCount': item_count})


def get_quest_model(request):
    q_id = request.GET['id']
    quest_to_return = Quest.objects.filter(id=q_id)
    q_title = quest_to_return.title
    q_creator_id = quest_to_return.creator.id
    q_creator = quest_to_return.creator.login
    q_games_count = 10  # Quest.join(Sessions.quest).user.count()
    q_description = quest_to_return.description
    q_points = list(QuestPoint.objects.filter(quest=quest_to_return))
    return JsonResponse({
        'id': q_id,
        'title': q_title,
        'creatorId': q_creator_id,
        'creator': q_creator,
        'gamesCount': q_games_count,
        'description': q_description,
        'points': q_points

    })


def get_quest_point_model(request):
    qp_id = request.GET['id']
    quest_point_to_return = QuestPoint.objects.filter(id=qp_id)
    qp_status = quest_point_to_return.status
    qp_description = quest_point_to_return.description
    qp_title = quest_point_to_return.title
    bp_lati = quest_point_to_return.latitude
    bp_long = quest_point_to_return.longitude
    return JsonResponse({
        'status': qp_status,
        'description': qp_description,
        'title': qp_title,
        'pointId': qp_id,
        'lati': bp_lati,
        'long': bp_long,

    })


def _getQuestFromPOST(request):
    json_data = json.loads(request.body)
    id = json_data["id"]
    title = json_data["title"]
    creator = json_data["creator"]
    creator_id = json_data["creator_id"]
    description = json_data["description"]
    points = json_data["points"]
    return id, title, creator, creator_id, description, points


@csrf_exempt
def quest(request):
    if request.method == 'POST':
        id, title, creator_name, creator_id, description, points = _getQuestFromPOST(request)
        creator = User.objects.filter(id=creator_id)
        new_quest = Quest(title=title, creator=creator, description=description)
        new_quest.save()
        for point in points:
            new_point = QuestPoint(status=point.status, title=point.title, description=point.description,
                                   latitude=point.lati, longitude=point.long, quest=point.quest,
                                   parentPoint=point.parentPoint)
            new_point.save()
        return HttpResponse('Successfully created')
    else:
        quest_list_model = list(Quest.objects.order_by('title'))
        item_count = Quest.objects.count()
        return JsonResponse({
            'quests': quest_list_model,
            'itemCount': item_count})

# def get_base_point_model(request):
#     bp_id = request.GET['id']
#     base_point_to_return = QuestPoint.objects.filter(id=bp_id)
#
#     return JsonResponse({
#
#
#     })
