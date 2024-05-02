from rest_framework import serializers
from .models import Category, Clothes

class ClothesCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothes
        fields = '__all__'
