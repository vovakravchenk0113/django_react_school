from django.db import models

class School(models.Model):
    id = models.AutoField(primary_key=True)
    school_name = models.CharField(max_length=100)

    def __str__(self):
        return self.id
    class Meta:
        db_table = "school"

class Statistics(models.Model):
    statistic_id = models.AutoField(primary_key=True)
    school_id = models.ForeignKey(School, on_delete=models.CASCADE)
    year = models.IntegerField()
    week = models.IntegerField()
    month = models.IntegerField()
    elect_eur = models.FloatField()
    elect_kwh = models.FloatField()
    heating_eur = models.FloatField()
    heating_kwh = models.FloatField()
    water_eur = models.FloatField()
    water_litres = models.FloatField()
    class Meta:
        db_table = "statistics"

class User(models.Model):
    uid = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=20)
    lastName = models.CharField(max_length=20)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)
    photoName = models.CharField(max_length=100)
    createdDateTime = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table = "users"