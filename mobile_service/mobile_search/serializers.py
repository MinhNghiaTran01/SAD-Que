from mobile_model.models import Mobile
from rest_framework import serializers

class MobileSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mobile
        fields = '__all__'
