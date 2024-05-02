from rest_framework.views import APIView
from rest_framework.response import Response
from mobile_model.models import Mobile
from .serializers import MobileSearchSerializer

class MobileSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        mobiles = Mobile.objects.all()

        name = query_params.get('name')
        category = query_params.get('category')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            mobiles = mobiles.filter(name__icontains=name)
        if category:
            mobiles = mobiles.filter(category__name__icontains=category)

        serializer = MobileSearchSerializer(mobiles, many=True)
        return Response(serializer.data)
