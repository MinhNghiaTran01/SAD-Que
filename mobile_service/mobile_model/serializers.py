from rest_framework import serializers
from .models import Category, Mobile


class MobileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mobile
        fields = '__all__'
