from django.db import models

# Create your models here.
class Education(models.Model):
    school=models.CharField(max_length=100)
    degree=models.CharField(max_length=100)
    years=models.CharField(max_length=25)
    cgpa=models.DecimalField(max_digits=5,decimal_places=2)
    ordinal=models.IntegerField()

class Experience(models.Model):
    title=models.CharField(max_length=100,null=True)
    company=models.CharField(max_length=100)
    duration=models.CharField(max_length=50)
    description=models.TextField()
    ordinal=models.IntegerField()

class Project(models.Model):
    title=models.CharField(max_length=100)
    description=models.TextField()
    image=models.ImageField(upload_to='uploads/')
    url=models.URLField(null=True)
    ordinal=models.IntegerField()

class Certificate(models.Model):
    title=models.CharField(max_length=100)
    issuer=models.CharField(max_length=100)
    image=models.ImageField(upload_to='uploads/',null=True)
    url=models.URLField()
    ordinal=models.IntegerField()

class Publication(models.Model):
    title=models.CharField(max_length=200)
    publishers=models.CharField(max_length=100)
    url=models.URLField()
    ordinal=models.IntegerField()

class Achievement(models.Model):
    title=models.CharField(max_length=200)
    description=models.TextField()
    image=models.ImageField(upload_to='uploads/', null=True)
    ordinal=models.IntegerField()
    