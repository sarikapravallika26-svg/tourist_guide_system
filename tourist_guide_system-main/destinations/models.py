from django.db import models
from django.utils import timezone


CATEGORY_CHOICES = [
    ('Beach', 'Beach'),
    ('Mountain', 'Mountain'),
    ('Historical', 'Historical'),
    ('Religious', 'Religious'),
    ('Wildlife', 'Wildlife'),
    ('Adventure', 'Adventure'),
]


class Destination(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    history = models.TextField(blank=True)
    best_time_to_visit = models.CharField(max_length=255, blank=True)
    entry_fee = models.CharField(max_length=100, blank=True)
    opening_hours = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='destinations/', blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
