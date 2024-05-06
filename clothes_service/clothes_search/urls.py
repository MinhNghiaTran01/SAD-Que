from django.urls import path
from .views import ClothesSearch

urlpatterns = [
    path('clothes/search', ClothesSearch.as_view(), name='clothes-search'),
]
