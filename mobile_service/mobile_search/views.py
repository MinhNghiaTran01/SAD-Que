from rest_framework.views import APIView
from rest_framework.response import Response
from mobile_model.models import Mobile
from .serializers import MobileSearchSerializer

class MobileSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        mobiles = Mobile.objects.all()

        name = query_params.get('name')
        categoryId = query_params.get('categoryId')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            mobiles = mobiles.filter(name__icontains=name)
        if categoryId:
            mobiles = mobiles.filter(category_id=categoryId)

        serializer = MobileSearchSerializer(mobiles, many=True)
        return Response(serializer.data)
