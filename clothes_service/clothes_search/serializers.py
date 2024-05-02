from clothes_model.models import Clothes
from rest_framework import serializers

class ClothesSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothes
        fields = '__all__'
