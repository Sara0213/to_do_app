from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:    # specjalna klasa, dzieki ktorej wiemy, jaki rodzaj serializer i jak tworzyc pola
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {"password": {"write_only": True}}   # nie zwracamy hasla, jedynie zapisujemy do bazy, 
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user