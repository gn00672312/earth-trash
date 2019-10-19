from django.http import JsonResponse

from .models import TrashRecord
# Create your views here.


def fetch_trash_records(request):
    result = {
        'data': [],
        'msg': ""
    }

    try:
        trash_qs = TrashRecord.objects.all()

        result['data'] = [trash.to_dict() for trash in trash_qs]

    except Exception as e:
        result['msg'] = str(e)

    return JsonResponse(result)
