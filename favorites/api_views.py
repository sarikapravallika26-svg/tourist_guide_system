from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from destinations.models import Destination
from .models import Favorite

User = get_user_model()


@api_view(['GET'])
def api_favorites(request):
    user = request.user
    if not user or not user.is_authenticated:
        return Response({'error': 'auth required'}, status=401)
    favs = Favorite.objects.filter(user=user).select_related('destination')
    data = [{'id': f.destination.id, 'name': f.destination.name} for f in favs]
    return Response({'favorites': data})
