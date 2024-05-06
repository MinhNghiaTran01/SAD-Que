from django.shortcuts import render

# Create your views here.
from django.urls import path
from .views import BookSearch

urlpatterns = [
    path('book/search/', BookSearch.as_view(), name='book-search'),
]
