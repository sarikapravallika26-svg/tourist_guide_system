from django.urls import path
from rest_framework import generics
from .models import Destination
from .serializers import DestinationSerializer

class DestinationListAPI(generics.ListAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer


class DestinationDetailAPI(generics.RetrieveAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer

urlpatterns = [
    path('destinations/', DestinationListAPI.as_view(), name='api_destinations'),
    path('destinations/<int:pk>/', DestinationDetailAPI.as_view(), name='api_destination_detail'),
]
