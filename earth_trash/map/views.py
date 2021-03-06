from django.shortcuts import render
from django.conf import settings


def index(request):
    template = 'map/index.html'
    context = {
        "DEBUG": settings.DEBUG,
        "SATELLITE_TILE_URL": settings.SATELLITE_TILE_URL
    }
    return render(request, template, context)
