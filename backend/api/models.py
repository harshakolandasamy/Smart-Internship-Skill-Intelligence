from django.db import models


class Student(models.Model):
    student_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    year = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.student_id})"


class Skill(models.Model):
    SKILL_LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='skills')
    skill_name = models.CharField(max_length=100)
    skill_level = models.CharField(max_length=50, choices=SKILL_LEVEL_CHOICES, default='Beginner')

    def __str__(self):
        return f"{self.skill_name} - {self.skill_level}"


class Internship(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Ongoing', 'Ongoing'),
        ('Completed', 'Completed'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='internships')
    company_name = models.CharField(max_length=150)
    role = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Applied')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.company_name} - {self.role}"


class Certificate(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='certificates')
    certificate_name = models.CharField(max_length=150)
    platform = models.CharField(max_length=100)
    issue_date = models.DateField()
    certificate_url = models.URLField(max_length=300)

    def __str__(self):
        return f"{self.certificate_name} ({self.platform})"