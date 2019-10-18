# -*- coding: utf-8 -*-
from django.urls import re_path
from .views import fetch_buoys

urlpatterns = [
    re_path('^fetch_buoys/', fetch_buoys, name='fetch_buoys'),
]
