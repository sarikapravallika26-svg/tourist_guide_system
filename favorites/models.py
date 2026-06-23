from django.db import models
from django.conf import settings
from destinations.models import Destination
from django.utils import timezone


class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'destination')

    def __str__(self):
        return f'{self.user} -> {self.destination}'
