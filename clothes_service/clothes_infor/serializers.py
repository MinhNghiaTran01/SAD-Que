from clothes_model.models import Clothes, Category
from rest_framework import serializers

class ClothesDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothes
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ClothesSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Clothes
        fields = '__all__'
