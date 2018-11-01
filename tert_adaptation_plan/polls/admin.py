from django.contrib import admin

# Register your models here.

from .models import Question, Choice


class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['question_text']
    fields = ('topic', 'question_text', 'geoQuest')
    list_filter = ('question_text', 'topic')
    list_display = ('question_text', 'topic')


class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('choice_text', 'votes')
    search_fields = ['choice_text']

    class Meta:
        model: Choice


admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
