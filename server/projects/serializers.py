from rest_framework import serializers

from .models import Task, Daily


class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'


class DailySerializer(serializers.ModelSerializer):
  tasks = serializers.SerializerMethodField()

  class Meta:
    model = Daily
    fields = ('user', 'date', 'tasks')

  def get_tasks(self, instance):
    all_tasks = instance.tasks.all().order_by('-updated_at')
    return TaskSerializer(all_tasks, many=True).data
