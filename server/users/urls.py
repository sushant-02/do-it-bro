from django.urls import path
from .views import SendOTPView, VerifyOTPView, UserDataView

urlpatterns = [
  path('send-otp/', SendOTPView.as_view(),
       name="send_otp"),
  path('verify-otp/', VerifyOTPView.as_view(),
       name="verify_otp"),
  path('get-user/', UserDataView.as_view(), name="get_user")
]
