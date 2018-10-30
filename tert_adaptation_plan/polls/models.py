from django.db import models
from django.contrib.gis.db import models as geo_model

from watson import search as watson


# Create your models here.


class Question(geo_model.Model):
    question_text = models.CharField(max_length=200, verbose_name="Текст вопроса")
    geoQuest = geo_model.PointField(verbose_name="Местоположение", srid=4326)

    RUSSIAN = 'RU'
    HISTORY = 'HI'
    GEOGRAPHY = 'GE'
    PHYSICS = 'PH'
    TOPIC_CHOICES = (
        (RUSSIAN, 'русский язык'),
        (HISTORY, 'история'),
        (GEOGRAPHY, 'география'),
        (PHYSICS, 'физика'),
    )
    topic = models.CharField(
        max_length=2,
        choices=TOPIC_CHOICES,
        default=RUSSIAN,
        verbose_name='Тема'
    )


    def __str__(self):
        return self.question_text

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'


class Choice(geo_model.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, verbose_name="Вопрос")
    choice_text = models.CharField(max_length=200, verbose_name="Текст ответа")
    votes = models.IntegerField(default=0, verbose_name="Голоса")
    geoChoice = geo_model.PointField(srid=4326, verbose_name="Местоположение")

    def __str__(self):
        return self.choice_text

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'
