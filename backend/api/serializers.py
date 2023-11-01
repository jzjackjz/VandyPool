from rest_framework import serializers
from rest_framework.authtoken.views import Token
from django.contrib.auth.models import User
from .models import FlightInformation, Timeslot


class FlightInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightInformation
        fields = ['id', 'ride_type', 'flight_time', 'flight_date', 'dropoff_point', 'airline']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']

        extra_kwargs = {'password':{
             'write_only':True,
             'required':True
        }}

    def create(self, validated_data):
         user = User.objects.create_user(**validated_data)
         Token.objects.create(user=user)
         return user

        

class TimeSlotSerializer(serializers.ModelSerializer):
        class Meta:
             model = Timeslot
             fields = '__all__'

