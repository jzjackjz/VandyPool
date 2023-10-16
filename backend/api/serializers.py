from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FlightInformation


class FlightInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInformation
        fields = ['id', 'ride_type', 'flight_time', 'flight_date', 'dropoff_point', 'airline']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        