from django.urls import path, include
from accounts.api_views import api_signup, api_login
from favorites.api_views import api_favorites
from reviews.api_views import api_review
from destinations.api_urls import urlpatterns as dest_api_urls

urlpatterns = [
    path('signup/', api_signup, name='api_signup'),
    path('login/', api_login, name='api_login'),
    path('favorites/', api_favorites, name='api_favorites'),
    path('review/', api_review, name='api_review'),
]

# include destination api urls
urlpatterns += dest_api_urls
