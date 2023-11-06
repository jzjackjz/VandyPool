from rest_framework import serializers
from rest_framework.authtoken.views import Token
from django.contrib.auth.models import User
from .models import FlightInformation, Timeslot, UserProfile


class FlightInformationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = FlightInformation
        fields = ['id', 'ride_type', 'flight_time', 'flight_date', 'dropoff_point', 'airline', 'user']


class UserSerializer(serializers.ModelSerializer):
    google_id = serializers.CharField(source='userprofile.google_id', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'google_id']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email']
        )
        google_id = self.initial_data.get('google_id')
        UserProfile.objects.create(user=user, google_id=google_id)
        Token.objects.create(user=user)
        return user

        
class TimeSlotSerializer(serializers.ModelSerializer):
        class Meta:
             model = Timeslot
             fields = '__all__'

