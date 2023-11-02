from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout, authenticate, login
from rest_framework import status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .models import FlightInformation, Timeslot
from .serializers import FlightInformationSerializer, UserSerializer, TimeSlotSerializer
from google.oauth2 import id_token
from google.auth.transport import requests


@api_view(['POST'])
def google_register(request):
    try:
        idinfo = id_token.verify_oauth2_token(request.data['token'], requests.Request(), "889198131381-dhul247pghoitlna875j2t6kej68mllq.apps.googleusercontent.com")

        userid = idinfo['sub']
        email = idinfo.get('email')
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')

        if not User.objects.filter(email=email).exists():
            user = User.objects.create_user(username=email, email=email, first_name=first_name, last_name=last_name)
            token, created = Token.objects.get_or_create(user=user)

            return Response({'status': 'success', 'user_id': user.id, 'sessionToken': token.key}, status=status.HTTP_201_CREATED)
        else:
            return Response({'status': 'error', 'message': 'User already exists'}, status=status.HTTP_409_CONFLICT)

    except ValueError:
        return Response({'status': 'error', 'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def google_login(request):
    token = request.data.get('token')
    if not token:
        return Response({'error': 'No token provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), "889198131381-dhul247pghoitlna875j2t6kej68mllq.apps.googleusercontent.com")

        email = idinfo.get('email')

        user = authenticate(request, email=email)

        if user is not None:
            login(request, user)
            token = generate_token_for_user(user)
            return Response({'status': 'success', 'token': token}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'No account found with the given email address'}, status=status.HTTP_404_NOT_FOUND)

    except ValueError:
        return Response({'status': 'error', 'message': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
from rest_framework.filters import SearchFilter

def logout_view(request):
    logout(request)
    return redirect("/")



def generate_token_for_user(user):
    token, created = Token.objects.get_or_create(user=user)
    return token.key


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
    filter_backends = [SearchFilter]
    search_fields = ['username']
