from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from users.api.views import RegisterView, UserDetailView

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", UserDetailView.as_view(), name="user-detail"),
]