from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_trip, name='planner'),
    path('history/', views.trip_history, name='trip_history'),
]
