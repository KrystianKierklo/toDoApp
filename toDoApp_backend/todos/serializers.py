from rest_framework import serializers
from .models import Todo
from datetime import datetime

class TodoSerializers(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M", read_only=True)
    class Meta:
        model = Todo
        fields = ['id', 'name', 'completed', 'created_at']

