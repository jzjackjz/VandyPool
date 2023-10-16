from django.urls import path, include
from .views import FlightInformationViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('flights', FlightInformationViewSet, basename='flights')

urlpatterns = [
    path('', include(router.urls))
]
