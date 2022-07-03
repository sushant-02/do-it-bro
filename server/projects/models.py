from django.db import models


class Project(models.Model):
  name = models.CharField(max_length=16)
  description = models.CharField(max_length=256)
  start_date = models.DateField()
  start_time = models.TimeField()
  end_date = models.DateField()
  end_time = models.TimeField()


class Task(models.Model):
  STATUS_CHOICES = (
    ('NOT_STARTED', 'Not Started'),
    ('IN_PROGRESS', 'In Progress'),
    ('COMPLETED', 'Completed'),
    ('DUE', 'Due'),
    ('INCOMPLETE', 'Incomplete'),
  )

  project = models.ForeignKey(Project, on_delete=models.CASCADE)
  title = models.CharField(max_length=32)
  start_date = models.DateField()
  start_time = models.TimeField()
  end_date = models.DateField()
  end_time = models.TimeField()
  status = models.CharField(
    max_length=16, choices=STATUS_CHOICES, default='NOT_STARTED')
