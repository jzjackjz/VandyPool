from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Rider, Driver

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']

class RiderSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Rider
        fields = ['user', 'phone_number']

class DriverSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Driver
        fields = ['user', 'phone_number', 'car_model', 'car_color', 'license_plate', 'seats_available']
