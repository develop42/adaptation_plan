from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Question
from rest_framework import generics, permissions
from .serializers import QuestionSerializer, LocationSerializer
from watson import search as watson

# Create your views here.


def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})


def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)


def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)


def index(request):
    latest_question_list = Question.objects.all()
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)


class QuestionList (generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = watson.filter(Question, self.request.GET.get('value'))
        return queryset

    def list(self, request, *args, **kwargs):
        response = super(QuestionList, self).list(request, *args, **kwargs)
        if len(response.data) == 0:
            response.data = dict(
                status='error',
                count=len(response.data),
                results=[]
            )
        else:
            response.data = dict(
                status='success',
                count=len(response.data),
                results=response.data
            )
        return response


def map(request):
    return render(request, 'polls/map.html', )


def search(request):
    return render(request, 'polls/search.html', )


class pointGeo(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    queryset = Question.objects.all()
