from django.shortcuts import render
from rest_framework import generics
from todos.api.serializers import TodoSerializer
from rest_framework.permissions import IsAuthenticated
from todos.models import Todo

# Create your views here.
class TodoListCreateView(generics.ListCreateAPIView):
      serializer_class = TodoSerializer
      permission_class = [IsAuthenticated]
      
      def get_queryset(self):
          user = self.request.user
          return Todo.objects.filter(user=user)
    
      def perform_create(self, serializer):
          serializer.save(user=self.request.user)
          
class TodoDetailView(generics.RetrieveUpdateDestroyAPIView): 
      serializer_class = TodoSerializer
      permission_class = [IsAuthenticated]
      
      def get_queryset(self):
          return super().get_queryset()
      