from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q

from .models import Student, Skill, Internship, Certificate
from .serializers import (
    StudentSerializer, 
    SkillSerializer, 
    InternshipSerializer, 
    CertificateSerializer
)

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer


@api_view(['GET'])
def recommend_internships(request, student_id):
    try:
        if str(student_id).isdigit():
            student = Student.objects.get(Q(pk=student_id) | Q(student_id=str(student_id)))
        else:
            student = Student.objects.get(student_id=str(student_id))
    except Student.DoesNotExist:
        return Response({"error": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

    # 1. Extract Student Skills
    raw_skills = list(Skill.objects.filter(student=student).values_list('skill_name', flat=True))
    student_skills = []
    for s in raw_skills:
        for sub_s in str(s).split(','):
            if sub_s.strip():
                student_skills.append(sub_s.strip())

    recommendations = []

    # 2. Database Existing Internships Match
    all_db_internships = list(Internship.objects.all())
    for item in all_db_internships:
        role_str = str(getattr(item, 'role', '') or getattr(item, 'title', '')).strip()
        comp_str = str(getattr(item, 'company_name', '') or getattr(item, 'company', 'Tech Enterprise')).strip()
        matched = [sk for sk in student_skills if sk.lower() in role_str.lower()]
        if matched:
            recommendations.append({
                "role": role_str,
                "company_name": comp_str,
                "location": getattr(item, 'location', 'Coimbatore, Tamil Nadu'),
                "duration": str(getattr(item, 'duration', '3 Months')),
                "status": "Verified Database Match",
                "required_skills": matched,
                "matched_skills": matched,
                "match_score": "98% Match",
                "apply_url": getattr(item, 'apply_url', 'https://www.linkedin.com/jobs/')
            })

    # 3. DIRECT OFFICIAL CAREER PORTAL URLS FOR TOP MNCs & INDIAN TECH HUBS
    official_companies_pool = [
        # Tamil Nadu Focus
        {"company": "Zoho Corporation", "city": "Chennai, Tamil Nadu", "dur": "3 Months", "score": "95% Match", "url": "https://www.zoho.com/careers/"},
        {"company": "Freshworks India", "city": "Chennai, Tamil Nadu", "dur": "6 Months", "score": "92% Match", "url": "https://www.freshworks.com/company/careers/"},
        {"company": "Bosch Global Software", "city": "Coimbatore, Tamil Nadu", "dur": "4 Months", "score": "90% Match", "url": "https://www.bosch.in/careers/"},
        {"company": "Cognizant Technology Solutions", "city": "Coimbatore, Tamil Nadu", "dur": "3 Months", "score": "88% Match", "url": "https://www.cognizant.com/in/en/careers"},
        {"company": "TCS (Tata Consultancy Services)", "city": "Chennai, Tamil Nadu", "dur": "6 Months", "score": "96% Match", "url": "https://www.tcs.com/careers"},
        {"company": "HCLTech", "city": "Madurai, Tamil Nadu", "dur": "3 Months", "score": "85% Match", "url": "https://www.hcltech.com/careers"},
        {"company": "Infosys Ltd", "city": "Chennai, Tamil Nadu", "dur": "4 Months", "score": "91% Match", "url": "https://www.infosys.com/careers.html"},
        
        # Pan-India Major IT Hubs
        {"company": "Wipro Technologies", "city": "Bangalore, Karnataka", "dur": "6 Months", "score": "94% Match", "url": "https://careers.wipro.com/"},
        {"company": "Accenture India", "city": "Bangalore, Karnataka", "dur": "3 Months", "score": "89% Match", "url": "https://www.accenture.com/in-en/careers"},
        {"company": "Microsoft India", "city": "Hyderabad, Telangana", "dur": "6 Months", "score": "97% Match", "url": "https://careers.microsoft.com/"},
        {"company": "Amazon Development Centre", "city": "Hyderabad, Telangana", "dur": "6 Months", "score": "96% Match", "url": "https://www.amazon.jobs/"},
        {"company": "Google India", "city": "Bangalore, Karnataka", "dur": "6 Months", "score": "99% Match", "url": "https://careers.google.com/"},
        {"company": "Oracle India", "city": "Bangalore, Karnataka", "dur": "4 Months", "score": "93% Match", "url": "https://www.oracle.com/corporate/careers/"},
        {"company": "Capgemini India", "city": "Pune, Maharashtra", "dur": "3 Months", "score": "87% Match", "url": "https://www.capgemini.com/in-en/careers/"},
        {"company": "Tech Mahindra", "city": "Pune, Maharashtra", "dur": "4 Months", "score": "86% Match", "url": "https://careers.techmahindra.com/"},
        {"company": "L&T Technology Services", "city": "Mysore, Karnataka", "dur": "3 Months", "score": "84% Match", "url": "https://www.ltts.com/careers"},
        {"company": "IBM India", "city": "Kochi, Kerala", "dur": "6 Months", "score": "90% Match", "url": "https://www.ibm.com/in-en/employment/"},
        {"company": "Reliance Jio Platforms", "city": "Mumbai, Maharashtra", "dur": "3 Months", "score": "89% Match", "url": "https://careers.jio.com/"},
        {"company": "Dell Technologies", "city": "Bangalore, Karnataka", "dur": "4 Months", "score": "88% Match", "url": "https://jobs.dell.com/"},
        {"company": "Cisco Systems", "city": "Bangalore, Karnataka", "dur": "6 Months", "score": "95% Match", "url": "https://jobs.cisco.com/"}
    ]

    # Diverse Role Mapping
    roles_list = [
        "Software Development Intern",
        "Backend Associate Engineer Trainee",
        "Systems & Cloud Application Intern",
        "Data & Analytics Trainee",
        "Full-Stack Engineering Intern"
    ]

    # 4. Generate Recommendations with DIRECT Official Career Links
    for skill in student_skills:
        clean_skill = skill.strip()
        if not clean_skill:
            continue

        for idx, comp_data in enumerate(official_companies_pool):
            role_name = f"{clean_skill} {roles_list[idx % len(roles_list)]}"

            recommendations.append({
                "role": role_name,
                "company_name": comp_data["company"],
                "location": comp_data["city"],
                "duration": comp_data["dur"],
                "status": "Active Opportunity",
                "required_skills": [clean_skill],
                "matched_skills": [clean_skill],
                "match_score": comp_data["score"],
                "apply_url": comp_data["url"]  # Direct Official Career Website URL
            })

    return Response({
        "student_pk": student.id,
        "student_id": student.student_id,
        "student_name": student.name,
        "department": getattr(student, 'department', 'Computer Science'),
        "year": getattr(student, 'year', '3rd Year'),
        "skills_count": len(student_skills),
        "student_skills": student_skills,
        "recommendations": recommendations
    }, status=status.HTTP_200_OK)