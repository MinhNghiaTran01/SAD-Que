from django.urls import path
from .views import ClothesCreate

urlpatterns = [
    path('clothes/', ClothesCreate.as_view(), name='clothes-create'),
]
