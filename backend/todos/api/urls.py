from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from todos.api.views import TodoListCreateView

router = DefaultRouter()

urlpatterns = [
    path('', TodoListCreateView.as_view(), name='todos-list')
]