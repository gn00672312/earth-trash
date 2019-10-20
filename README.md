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

This file you can copy `{project_root}/conf/prod/django.settings`, bug some settings needs configure.

1. set BASE_DIR.
2. set DATABASES.
3. set configument bellow this.
```
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
```
4. set SATELLITE_TILE_URL, but you need to get api key from https://cloud.maptiler.com/.

You don't need to use AWS services in dev enviorment, so remove it!
That's all. Good Luck!

Power by iEducation.
