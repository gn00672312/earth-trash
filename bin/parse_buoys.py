# -*- coding: utf-8 -*-
import os
import sys
import requests
import click
import json
from datetime import datetime, timedelta

HOME = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if HOME not in sys.path:
    sys.path.append(HOME)

import env
from django.conf import settings

OSMC_API_URL = ("http://osmc.noaa.gov/erddap/tabledap/OSMC_30day.geoJson?"
                "latitude,longitude"
                "&platform_type=%22DRIFTING BUOYS (GENERIC)%22&"
                "time={dt}")
OSMC_COLLECTION_DIR = settings.OSMC_COLLECTION_DIR

DTG_FORMAT = "%Y%m%d"


def parse_buoys_data(dt):
    try:
        url = OSMC_API_URL.format(dt=dt.strftime("%Y-%m-%dT%H:%M:%SZ"), )

        response = requests.get(url=url,
                                headers={"Accept": "application/json",
                                         "Accept-Encoding": "gzip, deflate"})

        dtg = dt.strftime(DTG_FORMAT)
        file_name = os.path.join(OSMC_COLLECTION_DIR, f'osmc_{dtg}.json')
        with open(file_name, 'w') as f:
            f.write(json.dumps(response.json()))

        print(f'parsed {dt} buoys data.')

    except Exception as e:
        print(f'parse fail: {dt}', e)


@click.command()
@click.option("--dtg_from", "-f", default=None, help="data from, format is yyyymmdd")
@click.option("--dtg_to", "-t", default=None, help="data to, format is yyyymmdd")
def main(dtg_from, dtg_to):
    if dtg_from is None:
        dtg_from = (datetime.now() - timedelta(days=1)).strftime(DTG_FORMAT)

    if dtg_to is None:
        dtg_to = (datetime.now() - timedelta(days=1)).strftime(DTG_FORMAT)

    dt_from = datetime.strptime(dtg_from, '%Y%m%d')
    dt_to = datetime.strptime(dtg_to, '%Y%m%d')

    if dt_from > dt_to:
        raise ValueError("dtg_from can't bigger than dtg_to.")

    diff_day = (dt_to - dt_from).days

    cnt = 0
    for d in range(diff_day + 1):
        dt = dt_from + timedelta(days=d)
        parse_buoys_data(dt)
        cnt += 1

    print(f"parse buoys data completed, generate {cnt} files, from {dt_from} to {dt_to}")


if __name__ == "__main__":
    main()
