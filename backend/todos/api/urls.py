from django.urls import path, include
from rest_framework.routers import DefaultRouter 
from todos.api.views import TodoListCreateView
from todos.api.views import TodoDetailView

router = DefaultRouter()

urlpatterns = [
    path('', TodoListCreateView.as_view(), name='todos-list'),
    path('<int:pk>/', TodoDetailView.as_view(), name='todo-detail')
]