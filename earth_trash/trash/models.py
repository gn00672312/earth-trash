import os
import uuid

from datetime import datetime
from django.db import models
from django.conf import settings

# Create your models here.


def generate_filename(instance, original_filename):
    ext = os.path.splitext(original_filename)[-1]
    filename = str(uuid.uuid1()) + ext
    filepath = os.path.join(settings.MEDIA_ROOT, 'garbage_photo', filename)
    filedir = os.path.dirname(filepath)
    if not os.path.exists(filedir):
        os.makedirs(filedir)

    return f'garbage_photo/{filename}'


class TrashRecord(models.Model):
    class Meta:
        app_label = 'trash'
        db_table = 'trash_record'
        indexes = [
            models.Index(fields=['dtime']),
        ]

    discoverer = models.CharField(max_length=100, null=False, verbose_name='Trash discoverer')
    dtime = models.DateTimeField(null=True, blank=True, default=datetime.now(), verbose_name='Trash discover time')
    latitude = models.DecimalField(max_digits=7, decimal_places=5, verbose_name='Trash latitude')
    longitude = models.DecimalField(max_digits=8, decimal_places=5, verbose_name='Trash longitude')
    note = models.TextField(null=True, blank=True, verbose_name='note something')

    def __str__(self):
        dtg = ""
        if self.dtime:
            dtg = "_" + self.dtime.strftime("%Y%m%d%H%M")
        return self.discoverer + dtg


class Garbage(models.Model):
    class Meta:
        app_label = 'trash'
        db_table = 'garbage'
        indexes = [
            models.Index(fields=['name']),
        ]

    name = models.CharField(max_length=100, null=False, verbose_name='type name')
    photo = models.ImageField(upload_to=generate_filename)

    def __str__(self):
        return self.name


class GarbageOfTrashRecord(models.Model):
    class Meta:
        app_label = 'trash'
        db_table = 'garbage_of_trash_record'

    record = models.ForeignKey('TrashRecord', related_name='garbage_types',
                               on_delete=models.deletion.CASCADE, verbose_name='Trash record')
    garbage = models.ForeignKey('Garbage', related_name='record',
                                on_delete=models.deletion.CASCADE, verbose_name='Garbage types')
    origin = models.CharField(max_length=100, verbose_name='The place of origin')
