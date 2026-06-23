from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Review
from destinations.models import Destination

User = get_user_model()


@api_view(['POST'])
def api_review(request):
    user = request.user
    if not user or not user.is_authenticated:
        return Response({'error': 'auth required'}, status=401)
    dest_id = request.data.get('destination')
    rating = request.data.get('rating')
    comment = request.data.get('comment', '')
    try:
        dest = Destination.objects.get(id=dest_id)
    except Destination.DoesNotExist:
        return Response({'error': 'destination not found'}, status=404)
    rev = Review.objects.create(user=user, destination=dest, rating=rating, comment=comment)
    return Response({'id': rev.id})
