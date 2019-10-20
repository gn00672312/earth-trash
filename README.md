2019 NASA SPACE APPS CHALLENGE Hackathon.

A global trash flow simulation map.

demo page: https://earth-trash.herokuapp.com/

technical structure: 

* backend: `python3.6` / `django2.2`
* frontend: `Vue.js` / `Leaflet.js` / `jQuery`
* database: `AWS RDS`
* storage: `AWS S3`
* deployment server: `Heroku`

if you want to run this project in dev eviorment, you must add `{project_root}/conf/dev/django.settings` file.

This file you can copy `{project_root}/conf/prod/django.settings`, or set configument below this.
```
# conf/dev/django.settings
import os

BASE_DIR = os.environ["BASE_DIR"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(os.environ.get("BASE_DIR"), "cache"),
        'TIMEOUT': 30,
    }
}

DEBUG = True
COMPRESS_ENABLED = False
COMPRESS_OFFLINE = False

APPEND_SLASH = False
ALLOWED_HOSTS = ['*']

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

# FORCE_SCRIPT_NAME = ""

# you need to get api key from https://cloud.maptiler.com/.
SATELLITE_API_KEY = os.environ["SATELLITE_API_KEY"]
SATELLITE_TILE_URL = "https://api.maptiler.com/tiles/satellite-mediumres-2018/{z}/{x}/{y}.jpg?key=" + SATELLITE_API_KEY
```

You don't need to use AWS services in dev enviorment, so remove it!

After gen `django.settings` file,

run 
```
$ python3 manage.py migrate
$ python3 runserver 0.0.0.0:8000
```

That's all. Good Luck!

Power by iEducation.
