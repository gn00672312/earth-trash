import requests
from datetime import datetime
from django.http import JsonResponse

# Create your views here.

OSMC_API_URL = ("http://osmc.noaa.gov/erddap/tabledap/OSMC_30day.geoJson?"
                "time,latitude,longitude"
                "&platform_type=%22DRIFTING BUOYS (GENERIC)%22&"
                "time>={dt_from}&time<={dt_to}")

DTG_FORMAT = "%Y%m%d"


def fetch_buoys(request):
    # print(reverse('earth_trash.layer_data.fetch_buoys'))
    dtg_from = request.GET.get('dtg_from')
    dtg_to = request.GET.get('dtg_to')

    result = {
        'data': [],
        'msg': ""
    }
    try:
        dt_from = dt_to = None
        if dtg_from:
            dt_from = datetime.strptime(dtg_from, DTG_FORMAT)

        if dtg_to:
            dt_to = datetime.strptime(dtg_to, DTG_FORMAT)

        if dt_from and dt_to:
            data = _fetch_buoys_data(dt_from, dt_to)
            result['data'] = data

    except Exception as e:
        result['msg'] = str(e)

    return JsonResponse(result)


def _fetch_buoys_data(dt_from, dt_to):

    url = OSMC_API_URL.format(dt_from=dt_from.strftime("%Y-%m-%dT%H:%M:%SZ"),
                              dt_to=dt_to.strftime("%Y-%m-%dT%H:%M:%SZ"))

    response = requests.get(url=url,
                            headers={"Accept": "application/json",
                                     "Accept-Encoding": "gzip, deflate"})

    return response.json()
