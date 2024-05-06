from rest_framework.views import APIView
from rest_framework.response import Response
from clothes_model.models import Clothes
from .serializers import ClothesSearchSerializer

class ClothesSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        clothes = Clothes.objects.all()
        name = query_params.get('name')
        categoryId = query_params.get('categoryId')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            clothes = clothes.filter(name__icontains=name)
        if categoryId:
            clothes = clothes.filter(category_id=categoryId)
        serializer = ClothesSearchSerializer(clothes, many=True)
        return Response(serializer.data)
