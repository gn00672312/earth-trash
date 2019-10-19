import os
import json
from django.http import JsonResponse
from django.conf import settings

DTG_FORMAT = "%Y%m%d"
OSMC_COLLECTION_DIR = settings.OSMC_COLLECTION_DIR


def fetch_buoys(request):
    dtg = request.GET.get('dtg')

    result = {
        'data': [],
        'msg': ""
    }

    try:
        if dtg:
            data = _fetch_buoys_data(dtg)
            result['data'] = data

    except Exception as e:
        result['msg'] = str(e)

    return JsonResponse(result)


def _fetch_buoys_data(dtg):
    data = {}

    file_name = os.path.join(OSMC_COLLECTION_DIR, f'osmc_{dtg}.json')
    if os.path.isfile(file_name):
        with open(file_name, 'r') as f:
            data = json.loads(f.read())

    return data
