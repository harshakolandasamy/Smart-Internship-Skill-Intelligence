from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StudentViewSet,
    SkillViewSet,
    InternshipViewSet,
    CertificateViewSet,
    recommend_internships
)

router = DefaultRouter()
router.register(r'students', StudentViewSet, basename='student')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'internships', InternshipViewSet, basename='internship')
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
    # Changed  to  to support string IDs like STU101
    path('recommendations/<str:student_id>/', recommend_internships, name='recommend-internships'),
]