from book_model.models import Book
from rest_framework import serializers

class BookSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
