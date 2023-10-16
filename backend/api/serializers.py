from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FlightInformation, Timeslot


class FlightInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInformation
        fields = ['id', 'ride_type', 'flight_time', 'flight_date', 'dropoff_point', 'airline']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        

class TimeSlotSerializer(serializers.ModelSerializer):
        class Meta:
             model = Timeslot
             fields = '__all__'

