from django.urls import path
from . import views

urlpatterns = [
    path('', views.favorites_list, name='favorites_list'),
    path('add/<int:dest_id>/', views.add_favorite, name='add_favorite'),
    path('remove/<int:dest_id>/', views.remove_favorite, name='remove_favorite'),
]
