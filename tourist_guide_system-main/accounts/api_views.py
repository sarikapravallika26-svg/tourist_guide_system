from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['POST'])
def api_signup(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    if not email or not password:
        return Response({'error': 'email and password required'}, status=400)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'user exists'}, status=400)
    user = User.objects.create_user(email=email, password=password, full_name=full_name or '')
    return Response({'id': user.id, 'email': user.email})


@api_view(['POST'])
def api_login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'invalid credentials'}, status=400)
    login(request, user)
    return Response({'id': user.id, 'email': user.email})
