from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import TripPlan
from destinations.models import Destination


@login_required
def create_trip(request):
    if request.method == 'POST':
        dest_id = request.POST.get('destination')
        dest = get_object_or_404(Destination, id=dest_id)
        start = request.POST.get('start_date')
        end = request.POST.get('end_date')
        travelers = int(request.POST.get('travelers', 1))
        budget = request.POST.get('estimated_budget') or None
        itinerary = request.POST.get('itinerary', '')
        TripPlan.objects.create(user=request.user, destination=dest, start_date=start, end_date=end, travelers=travelers, estimated_budget=budget, itinerary=itinerary)
        messages.success(request, 'Trip planned')
        return redirect('dashboard')
    destinations = Destination.objects.all()
    return render(request, 'pages/planner.html', {'destinations': destinations})


@login_required
def trip_history(request):
    trips = TripPlan.objects.filter(user=request.user)
    return render(request, 'planner/history.html', {'trips': trips})
