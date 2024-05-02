from django.urls import path
from .views import OrderCreate

urlpatterns = [
    path('orders/create/', OrderCreate.as_view(), name='order-create'),
]
