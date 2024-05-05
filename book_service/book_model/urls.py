from django.urls import path
from .views import BookCreate,CategoryList

urlpatterns = [
    path('book/', BookCreate.as_view(), name='book-create'),
    path('categories',CategoryList.as_view(),name='categories-list')
]
