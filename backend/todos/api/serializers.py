from rest_framework import serializers
from todos.models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['name', 'description']
        read_only_fields = ['user', 'is_completed', 'created_at']
        