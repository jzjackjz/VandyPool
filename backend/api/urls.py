from django.urls import path, include
from .views import FlightInformationViewSet, UserViewSet, TimeslotViewSet, google_login, google_register
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('flights', FlightInformationViewSet, basename='flights')
router.register('users', UserViewSet)
router.register('timeslot', TimeslotViewSet, basename='timeslot')


urlpatterns = [
    path('auth/google-register', google_register, name='google-register'),
    path('auth/google-login', google_login, name='google-login'),
    path('', include(router.urls)),
]
