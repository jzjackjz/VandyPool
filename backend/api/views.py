from django.shortcuts import render, HttpResponse, get_object_or_404
from rest_framework import status, generics, mixins, viewsets
from rest_framework.decorators import api_view, APIView
from rest_framework.response import Response
from .models import FlightInformation
from .serializers import FlightInformationSerializer


class FlightInformationViewSet(viewsets.ViewSet):

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