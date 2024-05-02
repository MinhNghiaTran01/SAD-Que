from django.urls import path
from .views import ClothesList, ClothesDetail

urlpatterns = [
    path('clothes/', ClothesList.as_view(), name='clothes-list'),
    path('clothes/<int:pk>/', ClothesDetail.as_view(), name='clothes-detail'),
]
