from django.urls import path,include
from rest_framework import routers
from . import views
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'education', views.EducationViewSet)
router.register(r'experience', views.ExperienceViewSet)
router.register(r'project', views.ProjectViewSet)
router.register(r'certificate', views.CertificateViewSet)
router.register(r'publication', views.PublicationViewSet)
router.register(r'achievement', views.AchievementViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('api/chatbot/', views.chatbot_response, name='chatbot_response'),
]

