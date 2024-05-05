from django.urls import path
from .views import ClothesCreate,CategoryCreate

urlpatterns = [
    path('clothes/', ClothesCreate.as_view(), name='clothes-create'),
    path('categories',CategoryCreate.as_view(),name='categories-create')
]
