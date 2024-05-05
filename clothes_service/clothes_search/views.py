from rest_framework.views import APIView
from rest_framework.response import Response
from clothes_model.models import Clothes
from .serializers import ClothesSearchSerializer

class ClothesSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        clothes = Clothes.objects.all()

        name = query_params.get('name')
        category = query_params.get('category')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            clothes = clothes.filter(name__icontains=name)
        if category:
            clothes = clothes.filter(category__name__icontains=category)
        serializer = ClothesSearchSerializer(clothes, many=True)
        return Response(serializer.data)
