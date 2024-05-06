from rest_framework.views import APIView
from rest_framework.response import Response
from book_model.models import Book
from .serializers import BookSearchSerializer

class BookSearch(APIView):
    def get(self, request):
        query_params = request.query_params
        book = Book.objects.all()

        name = query_params.get('name')
        categoryId = query_params.get('categoryId')
        # Thực hiện tìm kiếm dựa trên các tham số query
        if name:
            book = book.filter(name__icontains=name)
        if categoryId:
            book = book.filter(category_id=categoryId)
        serializer = BookSearchSerializer(book, many=True)
        return Response(serializer.data)