# Generated by Django 2.2 on 2019-10-19 09:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trash', '0003_auto_20191019_0858'),
    ]

    operations = [
        migrations.AddField(
            model_name='garbageoftrashrecord',
            name='weight',
            field=models.FloatField(blank=True, null=True, verbose_name='Garbage weight'),
        ),
        migrations.AlterField(
            model_name='trashrecord',
            name='dtime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2019, 10, 19, 9, 59, 15, 131397), null=True, verbose_name='Trash discover time'),
        ),
    ]
