from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ClothesCreateSerializer,CategoryCreateSerializer
from . models import Category

class ClothesCreate(APIView):
    def post(self, request):
        serializer = ClothesCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class CategoryCreate(APIView):
    def get(self, request):
        categories = Category.objects.all()
        categoriesSerializer=CategoryCreateSerializer(categories,many=True)
        return Response(categoriesSerializer.data, status=200)
