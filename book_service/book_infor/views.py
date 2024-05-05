
from rest_framework.views import APIView
from rest_framework.response import Response
from book_model.models import Book
from .serializers import BookDetailSerializer, BookSerializer

class BookList(APIView):
    def get(self, request):
        clothes = Book.objects.all()
        serializer = BookSerializer(clothes, many=True)
        return Response(serializer.data)

class BookDetail(APIView):
    def get(self, request, pk):
        try:
            clothes = Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return Response({'error': 'Book does not exist'}, status=400)

        serializer = BookDetailSerializer(clothes)
        return Response(serializer.data)
