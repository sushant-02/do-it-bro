from django.urls import path

from .views import DailyTask

urlpatterns = [
  path('daily/', DailyTask.as_view(), name='daily_task')
]
