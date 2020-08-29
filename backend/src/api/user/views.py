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

# TODO Tight with  forms and redirect to wright page
def register(request):
    context = {'form': RegistrationForm(),
               'action': request.build_absolute_uri()}
    print(context)
    if request.method == 'POST':
        user_form = RegistrationForm(data=request.POST)
        if user_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            user_profile = UserProfile()
            user_profile.user = user
            user_profile.save()
            login(request,user)
            return HttpResponseRedirect('user_cabinet/')
        else:
            print(user_form.errors)
    return render(request, 'main_page/authentification.html', context)


def sign_in(request):
    failed = False
    if request.method == 'POST':
        form = SignInForm(request.POST)
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            # Use Django's machinery to attempt to see if the username/password
            # combination is valid - a User object is returned if it is.
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('user_cabinet/')
            else:
                return HttpResponse("Invalid login details supplied.")
    context = {'form': SignInForm(),
               'action': request.build_absolute_uri(),
               'failed': failed}
    return render(request, 'main_page/authentification.html', context)