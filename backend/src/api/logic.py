from django.http import JsonResponse

def example(request):
    return JsonResponse({
            'key': 'value'
        })


    