from rest_framework import serializers

from .models import Task, Daily


class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'


class DailySerializer(serializers.ModelSerializer):
  tasks = TaskSerializer(many=True)

  class Meta:
    model = Daily
    fields = ('user', 'date', 'tasks')
