from django.http import JsonResponse

class User:
    def __init__(self, id, name, age):
        self._id = id
        self._name = name
        self._age = age

    def getId(self):
        return self._id
    def getName(self):
        return self._name
    def getAge(self):
        return self._age


def example(request):
    return JsonResponse({
            'key': 'value'
        })

def getUser(request):
    user = User(123, 'Loh', 82)
    return JsonResponse({
        'id': user.getId(),
        'name':user.getName(),
        'age':user.getAge()
    })

    