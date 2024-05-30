from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from users.api.views import RegisterView

router = DefaultRouter()

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register")
]