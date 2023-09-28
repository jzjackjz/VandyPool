from django.db import models
from django.contrib.auth.models import User

class Rider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)

class Driver(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    car_model = models.CharField(max_length=100)
    car_color = models.CharField(max_length=50)
    license_plate = models.CharField(max_length=15)
    seats_available = models.IntegerField()