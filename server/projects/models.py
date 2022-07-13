from django.db import models

from users.models import User


class Project(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=16)
  description = models.CharField(max_length=256)
  start_date = models.DateField()
  start_time = models.TimeField()
  end_date = models.DateField()
  end_time = models.TimeField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Daily(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  date = models.DateField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = 'Daily'
    verbose_name_plural = 'Daily'

  def __str__(self) -> str:
    return f'{self.user.first_name.capitalize()} ({self.date.strftime("%d/%m/%Y")})'

  def get_user_name(self) -> str:
    return f'{self.user.first_name.capitalize()}'


class Task(models.Model):
  STATUS_CHOICES = (
    ('todo', 'todo'),
    ('inProgress', 'inProgress'),
    ('complete', 'complete'),
    ('due', 'due'),
  )

  project = models.ForeignKey(
    Project, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
  daily = models.ForeignKey(
    Daily, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)
  title = models.CharField(max_length=32)
  start_date = models.DateField()
  start_time = models.TimeField()
  due_date = models.DateField()
  due_time = models.TimeField()
  status = models.CharField(
    max_length=16, choices=STATUS_CHOICES, default='todo')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self) -> str:
    return self.title
