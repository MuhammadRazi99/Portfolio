from rest_framework.decorators import api_view
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from .serializers import UserSerializer,EducationSerializer,ExperienceSerializer,ProjectSerializer,CertificateSerializer,PublicationSerializer,AchievementSerializer
from .models import Education,Experience,Project,Certificate,Publication,Achievement
from .chatbot import runApp
import logging
logger = logging.getLogger(__name__)

# Create your views here.
@api_view(['POST'])
def chatbot_response(request):
    if request.method=='POST':
        user_message=request.data.get('message','')
        
        if 'chat_history' not in request.session:
                request.session['chat_history'] = []

        history=request.session['chat_history']
        response=runApp(user_message,history)

        history.append({'role':'user','parts':[user_message]})
        history.append({'role':'model','parts':[response]})
        request.session['chat_history'] = history
        logger.debug(f"Session data: {request.session['chat_history']}")
        request.session.modified = True
        
        return JsonResponse({'response':response})
    return JsonResponse({'error':'Invalid request method'},status=400)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class EducationViewSet(viewsets.ModelViewSet):
    queryset=Education.objects.all()
    serializer_class=EducationSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class ExperienceViewSet(viewsets.ModelViewSet):
    queryset=Experience.objects.all()
    serializer_class=ExperienceSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset=Project.objects.all()
    serializer_class=ProjectSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class CertificateViewSet(viewsets.ModelViewSet):
    queryset=Certificate.objects.all()
    serializer_class=CertificateSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class PublicationViewSet(viewsets.ModelViewSet):
    queryset=Publication.objects.all()
    serializer_class=PublicationSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]

class AchievementViewSet(viewsets.ModelViewSet):
    queryset=Achievement.objects.all()
    serializer_class=AchievementSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]