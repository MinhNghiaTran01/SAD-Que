from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from order_model.models import Order
from .serializers import OrderSerializer
import requests
import json
class OrderDetail(APIView):
    def get(self, request, order_id):
        try:
            order = Order.objects.get(pk=order_id)
            orderJson={"quantity":order.quantity,"product_type":order.product_type,"user_id":order.user_id}
            if order.product_type=="1":
                url = 'http://127.0.0.1:8001/clothesinfor/clothes/1'

                try:
                    # Gửi GET request đến API endpoint
                    response = requests.get(url)

                    # Kiểm tra mã trạng thái của response
                    if response.status_code == 200:
                        
                        orderJson['product']=json.loads( response.text)
                    else:
                        print(f"Đã xảy ra lỗi! Mã trạng thái: {response.status_code}")
                except requests.exceptions.RequestException as e:
                    print(f"Lỗi trong quá trình gửi request: {e}")
                
            else:
                pass

        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

       
        return Response(orderJson,200)
class OrdersByUser(APIView):
    def get(self, request, user_id):
        orders = Order.objects.filter(user_id=user_id)
        orderList=[]
        for order in orders:
            orderJson={"quantity":order.quantity,"product_type":order.product_type,"user_id":order.user_id}
            if order.product_type=="1":
                url = 'http://127.0.0.1:8001/clothesinfor/clothes/1'

                try:
                    # Gửi GET request đến API endpoint
                    response = requests.get(url)

                    # Kiểm tra mã trạng thái của response
                    if response.status_code == 200:
                        
                        orderJson['product']=json.loads( response.text)
                    else:
                        print(f"Đã xảy ra lỗi! Mã trạng thái: {response.status_code}")
                except requests.exceptions.RequestException as e:
                    print(f"Lỗi trong quá trình gửi request: {e}")
                
            else:
                pass
            orderList.append(orderJson)
        return Response(orderJson,200)
