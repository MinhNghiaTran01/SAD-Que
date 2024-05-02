from rest_framework.views import APIView
from rest_framework.response import Response
from mobile_model.models import Mobile
from .serializers import MobileDetailSerializer,MobileSerializer

class MobileList(APIView):
    def get(self, request):
        mobiles = Mobile.objects.all()
        serializer = MobileSerializer(mobiles, many=True)
        return Response(serializer.data)
class MobileDetail(APIView):
    def get(self, request, pk):
        try:
            mobile = Mobile.objects.get(pk=pk)
        except Mobile.DoesNotExist:
            return Response({'error': 'Mobile does not exist'}, status=400)

        serializer = MobileDetailSerializer(mobile)
        return Response(serializer.data)

