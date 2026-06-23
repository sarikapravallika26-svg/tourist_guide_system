from django.db.models import Q
from django.shortcuts import get_object_or_404, render

from .models import CATEGORY_CHOICES, Destination


DESTINATION_CATEGORIES = [value for value, _label in CATEGORY_CHOICES]


def home(request):
    destinations = Destination.objects.all()[:8]
    return render(request, 'pages/index.html', {'destinations': destinations})


def destination_list(request):
    q = request.GET.get('q', '')
    category = request.GET.get('category', '')
    sort = request.GET.get('sort', 'top_rated')
    qs = Destination.objects.all()
    if q:
        qs = qs.filter(
            Q(name__icontains=q) |
            Q(category__icontains=q) |
            Q(state__icontains=q) |
            Q(country__icontains=q) |
            Q(description__icontains=q)
        )
    if category:
        qs = qs.filter(category=category)
    sort_map = {
        'top_rated': '-rating',
        'name_asc': 'name',
        'name_desc': '-name',
        'newest': '-created_at',
        'oldest': 'created_at',
    }
    qs = qs.order_by(sort_map.get(sort, '-rating'))
    return render(request, 'pages/destinations.html', {
        'destinations': qs,
        'q': q,
        'category': category,
        'sort': sort,
        'results_count': qs.count(),
        'categories': DESTINATION_CATEGORIES,
    })


def destination_detail(request, pk):
    dest = get_object_or_404(Destination, pk=pk)
    return render(request, 'destinations/detail.html', {'destination': dest})


def assistant_page(request):
    return render(request, 'pages/assistant.html')


def budget_page(request):
    return render(request, 'pages/budget.html')
