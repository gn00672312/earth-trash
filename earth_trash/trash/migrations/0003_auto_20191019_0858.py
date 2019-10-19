# Generated by Django 2.2 on 2019-10-19 08:58

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trash', '0002_auto_20191019_0810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trashrecord',
            name='dtime',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2019, 10, 19, 8, 58, 51, 922790), null=True, verbose_name='Trash discover time'),
        ),
        migrations.AlterField(
            model_name='trashrecord',
            name='latitude',
            field=models.DecimalField(decimal_places=7, max_digits=9, verbose_name='Trash latitude'),
        ),
        migrations.AlterField(
            model_name='trashrecord',
            name='longitude',
            field=models.DecimalField(decimal_places=7, max_digits=10, verbose_name='Trash longitude'),
        ),
    ]