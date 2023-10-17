from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import FlightInformation, Timeslot
from .serializers import FlightInformationSerializer, UserSerializer, TimeSlotSerializer


class FlightInformationViewSet(viewsets.ModelViewSet):

    #permission_classes = [IsAuthenticated]
    #authentication_classes = (TokenAuthentication,)

    queryset = FlightInformation.objects.all()
    serializer_class = FlightInformationSerializer
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TimeslotViewSet(viewsets.ModelViewSet):
    queryset = Timeslot.objects.all()
    serializer_class = TimeSlotSerializer

