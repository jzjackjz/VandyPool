from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Rider
from .serializers import RiderSerializer

class RegisterRiderView(APIView):
    def get(self, request):
        riders = Rider.objects.all()
        serializer = RiderSerializer(riders, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = RiderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_data = serializer.validated_data['user']
            user = User.objects.create_user(username=user_data['email'],
                                            password=user_data['password'],
                                            first_name=user_data['first_name'],
                                            last_name=user_data['last_name'],
                                            email=user_data['email'])
            
            rider = Rider(user=user, phone_number=serializer.validated_data['phone_number'])
            rider.save()
            return Response({"message": "Rider registered successfully!"})