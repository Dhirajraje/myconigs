
from django.urls import path, include
from .views import MSTModuleView


from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register("mstmodule", MSTModuleView, basename="mstmodule")

urlpatterns = [
    path('', include(router.urls)),
    path('mstmodule/list', MSTModuleAPIView.as_view())
]
