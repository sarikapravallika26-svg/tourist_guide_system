from django.core.management.base import BaseCommand
from destinations.models import Destination, CATEGORY_CHOICES
from reviews.models import Review
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Seed sample data for Smart Tourist Guide'

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(email='tourist@gmail.com').exists():
            User.objects.create_user(email='tourist@gmail.com', password='tourist', full_name='Default Tourist')
            self.stdout.write(self.style.SUCCESS('Created default tourist user'))

        categories = [c[0] for c in CATEGORY_CHOICES]
        for i, cat in enumerate(categories, start=1):
            name = f'Sample {cat} Place {i}'
            if not Destination.objects.filter(name=name).exists():
                Destination.objects.create(name=name, category=cat, state='State', country='Country', description=f'Description for {name}')
        self.stdout.write(self.style.SUCCESS('Seeded destinations'))

        # simple review seeding
        user = User.objects.filter(email='tourist@gmail.com').first()
        dest = Destination.objects.first()
        if user and dest and not Review.objects.exists():
            Review.objects.create(user=user, destination=dest, rating=5, comment='Great place')
            self.stdout.write(self.style.SUCCESS('Added sample review'))
