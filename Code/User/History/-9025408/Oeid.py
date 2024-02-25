from django.urls import path
from .views import DBPView,DayDropdown
urlpatterns = [
    path('dbp-master/',DBPView.as_view()),
    path('day-dropdown/',DayDropdown.as_view()),
]