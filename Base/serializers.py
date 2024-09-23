from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Education,Experience,Project,Certificate,Publication,Achievement

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Education
        fields= '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Experience
        fields= '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields= '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Certificate
        fields= '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Publication
        fields= '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model=Achievement
        fields= '__all__'
