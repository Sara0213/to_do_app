from rest_framework import serializers
from todos.models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", 'user', 'name', 'description', 'is_completed', 'created_at']
        read_only_fields = ['user', 'created_at']
