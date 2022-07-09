from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import UserOTPs, User
from .serializers import UserSerializer

from utils.auth_utils import generate_otp, send_otp_to_email, get_tokens_for_user


class SendOTPView(APIView):
  def post(self, request):
    """Sends OTP and updates/creates the UserOTP object"""

    email = request.data.get('email', None)
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


class VerifyOTPView(APIView):
  def post(self, request):
    """Verify the OTP and login the User"""
    email = request.data.get('email', None)
    otp = request.data.get('otp', None)

    if not email:
      return Response({'error': 'Enter a valid email address.', 'message': 'Enter a valid email address.'}, status=status.HTTP_400_BAD_REQUEST)

    if not otp:
      return Response({'error': 'OTP is required.', 'message': 'OTP is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if UserOTP object exists for the given email
    try:
      user_otp_obj = UserOTPs.objects.get(email=email)
    except Exception as e:
      return Response({'error': 'User OTP object not found!', 'message': 'Internal Server Error!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Check if OTP is invalid
    if int(otp) != int(user_otp_obj.otp):
      return Response({'error': 'Invalid OTP! Please try again', 'message': 'Invalid OTP! Please try again'}, status=status.HTTP_401_UNAUTHORIZED)

    # Create a new User
    try:
      user, created = User.objects.get_or_create(
        email=email)
      serializer = UserSerializer(instance=user, partial=True)
    except Exception as e:
      return Response({'error': serializer.errors, 'message': 'Internal Server Error! Please try again in sometime'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    tokens = get_tokens_for_user(user)

    return Response({'user': serializer.data, 'tokens': tokens}, status=status.HTTP_200_OK)


class UserDataView(APIView):
  permission_classes = (permissions.IsAuthenticated, )

  def get(self, request):
    serializer = UserSerializer(instance=request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)
