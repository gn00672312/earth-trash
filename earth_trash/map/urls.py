# -*- coding: utf-8 -*-
from django.urls import path
from earth_trash.map.views import (
    index
)

urlpatterns = [
    path('', index),
]
