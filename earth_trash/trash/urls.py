# -*- coding: utf-8 -*-
from django.urls import re_path
from .views import fetch_trash_records

urlpatterns = [
    re_path('^fetch_records/', fetch_trash_records, name='fetch_records'),
]
