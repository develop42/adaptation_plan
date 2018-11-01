from django.urls import path

from . import views
from .views import QuestionList, pointGeo


app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('map/', views.map, name='map'),
    path('geopoint/', pointGeo.as_view(), name='point'),
    path('map/static/templates/polls/search.html', views.search, name='search'),
    path('map/search/', QuestionList.as_view(), name='question_list'),
]
