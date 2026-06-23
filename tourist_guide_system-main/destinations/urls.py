from django.urls import path

from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('destinations/', views.destination_list, name='destinations'),
    path('destination/<int:pk>/', views.destination_detail, name='destination_detail'),
    path('assistant/', views.assistant_page, name='assistant'),
    path('budget/', views.budget_page, name='budget'),
]
