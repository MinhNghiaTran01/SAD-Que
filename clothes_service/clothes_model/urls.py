from django.urls import path
from .views import ClothesCreate,CategoryList

urlpatterns = [
    path('clothes/', ClothesCreate.as_view(), name='clothes-create'),
    path('categories',CategoryList.as_view(),name='categories-list')
]
