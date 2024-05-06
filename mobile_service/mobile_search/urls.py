from django.urls import path
from .views import MobileSearch

urlpatterns = [
    path('mobile/search', MobileSearch.as_view(), name='mobile-search'),
]
