from django.contrib import admin
from .models import Project, Daily, Task


class DailyAdmin(admin.ModelAdmin):
  list_display = ('id', 'user_name', 'date')
  ordering = ('id', )

  @admin.display()
  def user_name(self, obj):
    return obj.get_user_name()


class TaskAdmin(admin.ModelAdmin):
  list_display = ('title', 'start_date', 'start_time',
                  'due_date', 'due_time', 'is_daily')

  @admin.display(boolean=True)
  def is_daily(self, obj):
    return obj.daily is not None


admin.site.register(Project)
admin.site.register(Daily, DailyAdmin)
admin.site.register(Task, TaskAdmin)
