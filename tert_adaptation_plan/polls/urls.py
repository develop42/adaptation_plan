from django.urls import path

from . import views
from .views import QuestionList, pointGeo




app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
    path('quest/', QuestionList.as_view(), name='question_list'),
    path('map/', views.map, name='map'),
    path('search/', views.searchModel, name='search'),
    path('geopoint/', pointGeo.as_view(), name='point'),
    path('map/search_text.html/', views.searchModel, name='searchModel'),


]