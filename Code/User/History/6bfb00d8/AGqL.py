from django.urls import re_path
from django.conf import settings
from react.views import serve_angular
from os.path import join

urlpatterns = [
    re_path(r"^(?P<path>.*)$", serve_angular, {"document_root": settings.ANGULAR_BUILD_PATH}),
]