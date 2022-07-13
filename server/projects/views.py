from datetime import datetime
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Daily
from .serializers import DailySerializer, TaskSerializer


class DailyTask(APIView):
  permission_classes = (permissions.IsAuthenticated, )

  def get(self, request):
    user = request.user
    date = datetime.date(datetime.today())  # Today's date (UTC)

    try:
      daily, created = Daily.objects.get_or_create(user=user, date=date)
    except Exception as e:
      return Response({'error': str(e), 'message': 'Internal Server Error! Please try in sometime'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    serializer = DailySerializer(instance=daily)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request):
    user = request.user
    date = datetime.date(datetime.today())  # Today's date (UTC)

    # Check whether daily data exists for the user for current date, if not create one
    try:
      daily_obj, created = Daily.objects.get_or_create(
        user=user, date=date)
    except Exception as e:
      return Response({'error': 'Cannot get or create Daily model object', 'message': 'Unable to add task, please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Create a new task for the user
    task_data = request.data
    task_data['start_date'] = date
    task_data['due_date'] = date
    task_data['daily'] = daily_obj.id

    serializer = TaskSerializer(data=task_data)
    try:
      serializer.is_valid(raise_exception=True)
      serializer.save()

      return Response({'task': serializer.data}, status=status.HTTP_201_CREATED)
    except Exception as e:
      if serializer.errors:
        return Response({'error': serializer.errors, 'message': 'Something went wrong. Please try again in sometime'}, status=status.HTTP_400_BAD_REQUEST)
      return Response({'error': str(e), 'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  # def delete(self, request):
  #   user = request.user
  #   date = datetime.date(datetime.today())  # Today's date (UTC)

  #   # Check whether daily data exists for the user for current date, if not create one
  #   try:
  #     daily_obj, created = Daily.objects.get_or_create(user=user, date=date)
  #   except Exception as e:
  #     return Response({'error': 'Cannot get or create Daily model object', 'message': 'Unable to add task, please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
