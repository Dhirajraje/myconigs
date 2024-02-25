from django.urls import path
from .views import DBPView

urlpatterns = [
    path('dbp-master/',DBPView.as_view())
]