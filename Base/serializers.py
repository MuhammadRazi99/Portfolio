from django.contrib.auth.models import Group, User
from rest_framework import serializers
from .models import Education,Experience,Project,Certificate,Publication,Achievement,PortfolioImage

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

class PortfolioImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=PortfolioImage
        fields=['id', 'image', 'caption', 'ordinal']

class ProjectSerializer(serializers.ModelSerializer):
    images = PortfolioImageSerializer(many=True, read_only=True)
    first_image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'summary', 'description', 'url',
            'tech_stack', 'ordinal', 'first_image', 'images'
        ]

    def get_first_image(self, obj):
        first = obj.images.first()
        return first.image.url if first else None

class CertificateSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model=Certificate
        fields = ['id', 'title', 'issuer', 'url', 'ordinal', 'image']

    def get_image(self, obj):
        first = obj.images.first()
        return PortfolioImageSerializer(first).data if first else None

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Publication
        fields= '__all__'

class AchievementSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model=Achievement
        fields = ['id', 'title', 'description', 'ordinal', 'image']

    def get_image(self, obj):
        first = obj.images.first()
        return PortfolioImageSerializer(first).data if first else None
