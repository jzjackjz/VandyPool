from django.urls import path, include
from .views import FlightInformationViewSet, UserViewSet, TimeslotViewSet, google_login, google_register, DriverViewSet, add_phone_number
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('flights', FlightInformationViewSet, basename='flights')
router.register('driver', DriverViewSet, basename='driver')
router.register('users', UserViewSet)
router.register('timeslot', TimeslotViewSet, basename='timeslot')


urlpatterns = [
    path('auth/google-register', google_register, name='google-register'),
    path('auth/google-login', google_login, name='google-login'),
    path('add-phone-number', add_phone_number, name='add-phone-number'),
    path('users/current-user/', UserViewSet.as_view({'get': 'current_user'}), name='current-user'),
    path('', include(router.urls)),
]
