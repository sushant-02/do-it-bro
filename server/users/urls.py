from django.urls import path
from .views import SendOTPView

urlpatterns = [
  path('auth/', SendOTPView.as_view(), name="get_or_create_user")
]
