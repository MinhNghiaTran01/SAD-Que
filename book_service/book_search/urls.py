from django.shortcuts import render

# Create your views here.
from django.urls import path
from .views import ClothesSearch

urlpatterns = [
    path('book/search/', ClothesSearch.as_view(), name='book-search'),
]
