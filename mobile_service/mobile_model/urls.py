from django.urls import path
from .views import MobileCreate

urlpatterns = [
    path('mobile', MobileCreate.as_view(), name='mobile-create'),
]
