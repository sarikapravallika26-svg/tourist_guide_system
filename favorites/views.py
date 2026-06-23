from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Favorite
from destinations.models import Destination


@login_required
def add_favorite(request, dest_id):
    dest = get_object_or_404(Destination, id=dest_id)
    Favorite.objects.get_or_create(user=request.user, destination=dest)
    messages.success(request, 'Added to favorites')
    return redirect('destination_detail', pk=dest.id)


@login_required
def remove_favorite(request, dest_id):
    dest = get_object_or_404(Destination, id=dest_id)
    Favorite.objects.filter(user=request.user, destination=dest).delete()
    messages.info(request, 'Removed favorite')
    return redirect('favorites_list')


@login_required
def favorites_list(request):
    favs = Favorite.objects.filter(user=request.user).select_related('destination')
    return render(request, 'favorites/list.html', {'favorites': favs})
