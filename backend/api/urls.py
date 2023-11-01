from django.urls import path, include
from .views import FlightInformationViewSet, UserViewSet, TimeslotViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('flights', FlightInformationViewSet, basename='flights')
router.register('users', UserViewSet)
router.register('timeslot', TimeslotViewSet, basename='timeslot')


urlpatterns = [
    path('', include(router.urls)),
]
