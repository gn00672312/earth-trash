from django.shortcuts import render


def index(request):
    template = 'map/index.html'
    context = {}
    return render(request, template, context)
