from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Count
from django.shortcuts import render

from destinations.models import Destination
from planner.models import TripPlan
from reviews.models import Review

User = get_user_model()


@login_required
def dashboard_view(request):
    user = request.user
    total_saved = user.favorite_set.count() if hasattr(user, 'favorite_set') else 0
    total_trips = TripPlan.objects.filter(user=user).count()
    total_reviews = Review.objects.filter(user=user).count()
    favorites = user.favorite_set.select_related('destination')[:5] if hasattr(user, 'favorite_set') else []
    return render(request, 'dashboard/dashboard.html', {
        'total_saved': total_saved,
        'total_trips': total_trips,
        'total_reviews': total_reviews,
        'favorites': favorites,
    })


def is_admin(user):
    return user.is_superuser


@user_passes_test(is_admin)
def admin_dashboard(request):
    total_users = User.objects.count()
    total_destinations = Destination.objects.count()
    total_reviews = Review.objects.count()
    total_trips = TripPlan.objects.count()
    category_distribution = Destination.objects.values('category').annotate(count=Count('id'))
    popular = Destination.objects.annotate(reviews=Count('reviews')).order_by('-reviews')[:5]
    return render(request, 'pages/admin.html', {
        'total_users': total_users,
        'total_destinations': total_destinations,
        'total_reviews': total_reviews,
        'total_trips': total_trips,
        'category_distribution': list(category_distribution),
        'popular': popular,
    })
