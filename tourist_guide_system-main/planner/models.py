from django.db import models
from django.conf import settings
from destinations.models import Destination
from django.utils import timezone


class TripPlan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    travelers = models.PositiveIntegerField(default=1)
    estimated_budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    itinerary = models.TextField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user} - {self.destination} ({self.start_date})'
