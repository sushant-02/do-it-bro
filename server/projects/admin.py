from django.contrib import admin
from .models import Project, Daily, Task


class DailyAdmin(admin.ModelAdmin):
  list_display = ('id', 'user_name', 'date')
  ordering = ('id', )

  @admin.display()
  def user_name(self, obj):
    return obj.get_user_name()


admin.site.register([Project, Task])
admin.site.register(Daily, DailyAdmin)
