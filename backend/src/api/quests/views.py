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


def _get_user_and_quest_POST(request):
    json_data = json.loads(request.body)
    user = json_data["user"]
    started_quest = json_data["quest"]
    return user, started_quest


def start_session(request):
    user, started_quest = _get_user_and_quest_POST()
    new_session = Sessions(user=user, quest=started_quest)
    new_session.save()


@csrf_exempt
def get_quest_model(request, id):
    quest_to_return = Quest.objects.filter(id=id)
    quest_to_return = quest_to_return[0]
    q_title = quest_to_return.title
    q_creator = quest_to_return.creator
    q_creator_id = q_creator.id
    q_creator = q_creator.login
    q_games_count = 10  # Quest.join(Sessions.quest).user.count()
    q_description = quest_to_return.description
    q_points = list(QuestPoint.objects.filter(quest=quest_to_return))
    return JsonResponse({
        'id': id,
        'title': q_title,
        'creatorId': q_creator_id,
        'creator': q_creator,
        'gamesCount': q_games_count,
        'description': q_description,
        'points': q_points

    })

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
    creator_id = json_data["creator_id"]
    description = json_data["description"]
    points = json_data["points"]
    return title, creator_id, description, points


@csrf_exempt
def quest(request):
    if request.method == 'POST':
        title, creator_id, description, points = _getQuestFromPOST(request)
        creator = User.objects.filter(id=creator_id)[0]
        Quest(title=title, creator=creator, description=description).save()
        if points:
            for point in points:
                QuestPoint(status=point['status'], \
                            title=point['title'], \
                            description=point['description'], \
                            latitude=point['latitude'], \
                            longitude=point['longitude'], \
                            quest=point['quest'],\
                            parentPoint=point['parentPoint']).save() 
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
