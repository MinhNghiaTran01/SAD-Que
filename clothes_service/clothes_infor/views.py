from rest_framework.views import APIView
from rest_framework.response import Response
from clothes_model.models import Clothes
from .serializers import ClothesDetailSerializer, ClothesSerializer

class ClothesList(APIView):
    def get(self, request):
        clothes = Clothes.objects.all()
        serializer = ClothesSerializer(clothes, many=True)
        return Response(serializer.data)

class ClothesDetail(APIView):
    def get(self, request, pk):
        try:
            clothes = Clothes.objects.get(pk=pk)
        except Clothes.DoesNotExist:
            return Response({'error': 'Clothes does not exist'}, status=400)

        serializer = ClothesDetailSerializer(clothes)
        return Response(serializer.data)
