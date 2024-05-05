from rest_framework.views import APIView
from rest_framework.response import Response
from book_model.models import Book
from .serializers import BookSearchSerializer

class BookSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        book = Book.objects.all()

        name = query_params.get('name')
        category = query_params.get('category')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            book = book.filter(name__icontains=name)
        if category:
            book = book.filter(category__name__icontains=category)
        serializer = BookSearchSerializer(book, many=True)
        return Response(serializer.data)