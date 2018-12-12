from django.contrib import admin

# Register your models here.

from .models import Question, Choice
from django.contrib.auth.models import Group, User


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

admin.site.unregister(Group)


class UserAdmin(admin.ModelAdmin):
    exclude = ('groups', 'user_permissions')

    class Meta:
        model: User


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
