from rest_framework import serializers
from .models import Question
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class QuestionSerializer(serializers.ModelSerializer):
    question_list = Question.objects.all()
    class Meta:
        model = Question
        fields = ('question_text', 'geoQuest',)

class LocationSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Question
        geo_field = "geoQuest"
        fields = ('question_text',)