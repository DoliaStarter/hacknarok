from django.http import JsonResponse
from django.shortcuts import render
from backend.src.models import *


def index(request):
    context = {}
    return render(request, '', context)


def get_quest_list_model(request):
    quest_list_model = list(Quest.objects.order_by('title'))
    item_count = Quest.objects.count()
    return JsonResponse({
        'quests': quest_list_model,
        'itemCount': item_count
    })


def get_quest_model(request):
    q_id = request.GET['id']
    quest_to_return = Quest.objects.filter(id=q_id)
    q_title = quest_to_return.title
    q_creator_id = quest_to_return.creator.id
    q_creator = quest_to_return.creator.login
    q_games_count = 0  # TODO
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
    return JsonResponse({
        'status': qp_status,
        'description': qp_description,
        'title': qp_title,

    })


def get_base_point_model(request):
    bp_id = request.GET['id']
    base_point_to_return = QuestPoint.objects.filter(id=bp_id)
    bp_lang = base_point_to_return.latitude
    bp_long = base_point_to_return.longitude
    return JsonResponse({
        'pointId': bp_id,
        'lang': bp_lang,
        'long': bp_long,

    })
