from rest_framework import serializers
from .models import FlightInformation, Timeslot


class FlightInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInformation
        fields = ['id', 'ride_type', 'flight_time', 'flight_date', 'dropoff_point', 'airline']

class TimeSlotSerializer(serializers.ModelSerializer):
        class Meta:
             model = Timeslot
             fields = '__all__'

