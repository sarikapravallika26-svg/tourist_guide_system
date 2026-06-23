from django.contrib import admin
from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'state', 'country', 'created_at')
    search_fields = ('name', 'state', 'country')
    list_filter = ('category',)
