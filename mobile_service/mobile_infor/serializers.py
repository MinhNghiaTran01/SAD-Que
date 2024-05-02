from mobile_model.models import Mobile,Category
from rest_framework import serializers

class MobileDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mobile
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class MobileSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Mobile
        fields = '__all__'