from rest_framework import serializers
from .models import Student, Skill, Internship, Certificate


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def validate_year(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Year must be between 1 and 5.")
        return value

    def validate_email(self, value):
        if not value.endswith('@gmail.com') and not value.endswith('@edu.in') and '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address.")
        return value


class SkillSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.name')

    class Meta:
        model = Skill
        fields = '__all__'


class InternshipSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.name')

    class Meta:
        model = Internship
        fields = '__all__'

    def validate(self, data):
        if data.get('end_date') and data.get('start_date'):
            if data['end_date'] < data['start_date']:
                raise serializers.ValidationError({"end_date": "End date cannot be earlier than start date."})
        return data


class CertificateSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.name')

    class Meta:
        model = Certificate
        fields = '__all__'