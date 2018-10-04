from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import Question
from rest_framework import generics, permissions
from .serializers import QuestionSerializer, LocationSerializer
from watson import search as watson
from .forms import Form
from django.http import Http404


# Create your views here.

def detail(request, question_id):
    question = get_object_or_404(Question, pk = question_id)
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
        queryset = Question.objects.all()
        return queryset


def map(request):
    # question = Question.objects.all()
    form = Form(request.POST)
    if request.method == 'POST':
        form = Form(request.POST)
        if form.is_valid():
            query = request.POST.get('input')
            search_results = watson.search(query)
            return render(request, 'polls/map.html', {'form': form, 'search_results': search_results, 'query': query})
        else:
            form = Form()
    return render(request, 'polls/map.html', {'form': form})



def searchModel(request):
    return render(request, 'polls/search_text.html', )


class pointGeo(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = [
        permissions.AllowAny
    ]

    def get_queryset(self):
        queryset = Question.objects.all()
        return queryset
