from django.urls import path
from .views import OrderDetail, OrdersByUser

urlpatterns = [
    path('<int:order_id>/', OrderDetail.as_view(), name='order-detail'),
    path('user/<int:user_id>/', OrdersByUser.as_view(), name='orders-by-user'),
]
