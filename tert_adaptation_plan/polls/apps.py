from django.apps import AppConfig
from watson import search as watson


class PollsConfig(AppConfig):
    name = 'polls'
    verbose_name = u"Опросы"

    def ready(self):
        Question = self.get_model("Question")
        Choice = self.get_model("Choice")
        watson.register(Question)
        watson.register(Choice)
