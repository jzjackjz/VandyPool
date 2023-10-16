from django.db import models

# Create your models here.


class FlightInformation(models.Model):
    ride_type = models.CharField(max_length=10)
    flight_time = models.TimeField()
    flight_date = models.DateField()
    dropoff_point = models.CharField(max_length=20)
    airline = models.CharField(max_length=30)

    def __str__(self):
        return self.ride_type

class Timeslot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    space_available = models.IntegerField()