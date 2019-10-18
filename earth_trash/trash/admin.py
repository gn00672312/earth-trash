from django.contrib import admin
from earth_trash.trash.models import (
    TrashRecord,
    Garbage,
    GarbageOfTrashRecord
)


class GarbageOfTrashRecordAdminInline(admin.TabularInline):
    model = GarbageOfTrashRecord
    extra = 0


class TrashRecordAdmin(admin.ModelAdmin):
    inlines = [
        GarbageOfTrashRecordAdminInline
    ]

    list_display = ('discoverer', 'dtime', 'latitude', 'longitude', 'note')


class GarbageAdmin(admin.ModelAdmin):
    list_display = ('name', 'photo')


class GarbageOfTrashRecordAdmin(admin.ModelAdmin):
    list_display = ('record', 'garbage')


admin.site.register(GarbageOfTrashRecord, GarbageOfTrashRecordAdmin)
admin.site.register(TrashRecord, TrashRecordAdmin)
admin.site.register(Garbage, GarbageAdmin)
