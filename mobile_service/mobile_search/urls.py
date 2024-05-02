from django.urls import path
from .views import MobileSearch

urlpatterns = [
    path('mobiles/search', MobileSearch.as_view(), name='mobile-search'),
]
