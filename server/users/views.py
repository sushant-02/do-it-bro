from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import UserOTPs

from utils.auth_utils import generate_otp, send_otp_to_email


class SendOTPView(APIView):
  def post(self, request):
    """Sends OTP and Gets/Creates a User"""

    email = request.data.get('email')
    if not email:
      return Response({'error': 'Enter a valid email address.', 'message': 'Enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

    # Add OTP to model and send to email
    otp = generate_otp()

    try:
      UserOTPs.objects.update_or_create(
        email=email, defaults={'email': email, 'otp': otp})
    except Exception as e:
      return Response({
        'error': 'Error while creating or updating UserOTPs model objects.', 'message': 'Internal Server Error! Please try again in sometime.'
      }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
      send_otp_to_email(email, otp)
    except Exception as e:
      return Response({'error': 'Error sending email.', 'message': 'Internal Server Error! Please try again in sometime.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'successMsg': 'OTP Sent Successfully'}, status=status.HTTP_200_OK)
