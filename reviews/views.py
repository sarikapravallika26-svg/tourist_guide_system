from django.shortcuts import redirect, get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Review
from destinations.models import Destination


@login_required
def add_review(request, dest_id):
    dest = get_object_or_404(Destination, id=dest_id)
    if request.method == 'POST':
        rating = int(request.POST.get('rating', 0))
        comment = request.POST.get('comment', '')
        Review.objects.create(user=request.user, destination=dest, rating=rating, comment=comment)
        messages.success(request, 'Review added')
    return redirect('destination_detail', pk=dest.id)
