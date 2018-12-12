from django.urls import path

from . import views
from .views import QuestionList, pointGeo


app_name = 'polls'
urlpatterns = [
    path('index', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('', views.map, name='map'),
    path('geopoint/', pointGeo.as_view(), name='point'),
    path('templates/polls/search.html', views.search, name='search'),
    path('search/', QuestionList.as_view(), name='question_list'),
]
