from django.urls import path, include
from .views import FlightInformationViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('flights', FlightInformationViewSet, basename='flights')
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]
