import datetime

from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Daily
from .serializers import TaskSerializer


class DailyTask(APIView):
  permission_classes = (permissions.IsAuthenticated, )

  def post(self, request):
    user = request.user

    # # Check whether daily data exists for the user for current date, if not create one
    # try:
    #   daily_obj, created = Daily.objects.get_or_create(user=user)
    # except Exception as e:
    #   return Response({'error': 'Cannot get or create Daily model object', 'message': 'Unable to add task, please try again later!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # # Create a new task for the user
    # task_data = request.data
    # today = task_data.pop('date', None)

    # if not today:
    #   return Response({'error': 'Date not provided', 'message': 'Something went wrong! Please try again later'}, status=status.HTTP_400_BAD_REQUEST)

    # task_data['start_date'] =
    # task_data['end_date'] = datetime.fromtimestamp(today)
    # task_data['daily'] = daily_obj

    # serializer = TaskSerializer(data=daily_obj)
    # print(serializer)

    return Response({'hi': 'there'}, status=status.HTTP_200_OK)
