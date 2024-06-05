from django.shortcuts import render
from rest_framework import generics
from users.models import User
from users.api.serializers import UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]     # kazdy moze dostac sie do tego widoku, bez rejestracji
    

class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user