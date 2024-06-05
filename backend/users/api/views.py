from django.shortcuts import render
from rest_framework import generics
from users.models import User
from users.api.serializers import UserSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]     # kazdy moze dostac sie do tego widoku, bez rejestracji
    