from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from order_model.models import Order
from .serializers import OrderSerializer

class OrderDetail(APIView):
    def get(self, request, order_id):
        try:
            order = Order.objects.get(pk=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order)
        return Response(serializer.data)
class OrdersByUser(APIView):
    def get(self, request, user_id):
        orders = Order.objects.filter(user_id=user_id)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
