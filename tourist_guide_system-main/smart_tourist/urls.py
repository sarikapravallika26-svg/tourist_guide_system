from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('destinations.urls')),
    path('', include('accounts.urls')),
    path('reviews/', include('reviews.urls')),
    path('planner/', include('planner.urls')),
    path('favorites/', include('favorites.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
