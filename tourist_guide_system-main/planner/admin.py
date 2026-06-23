from django.contrib import admin
from .models import TripPlan


@admin.register(TripPlan)
class TripPlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'destination', 'start_date', 'end_date')
