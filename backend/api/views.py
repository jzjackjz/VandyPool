from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import FlightInformation, Timeslot
from .serializers import FlightInformationSerializer, UserSerializer, TimeSlotSerializer


class FlightInformationViewSet(viewsets.ViewSet):

    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication,)

    def list(self, request):
        flights = FlightInformation.objects.all()
        serializer = FlightInformationSerializer(flights, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = FlightInformationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        queryset = FlightInformation.objects.all()
        flight = get_object_or_404(queryset, pk=pk)
        seralizer = FlightInformationSerializer(flight)
        return Response(seralizer.data)
    
    def update(self, request, pk=None):
        flight = FlightInformation.objects.get(pk=pk)

        serializer = FlightInformationSerializer(flight, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        flight = FlightInformation.objects.get(pk=pk)
        flight.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TimeslotViewSet(viewsets.ModelViewSet):
    queryset = Timeslot.objects.all()
    serializer_class = TimeSlotSerializer

