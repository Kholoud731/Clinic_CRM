from .models import Appointment, WorkingHour
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, UserSerializerCreation, AppointmentViewSerializer,AppointmentAddSerializer,WorkingHoursSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers

# get thw permission of the user to display the page
@api_view(["GET"]) 
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication]) 
def user_details(request):
    user = User.objects.get(id = request.user.id)
    serializer = UserSerializer( user)
    return Response(data= serializer.data, status=status.HTTP_201_CREATED)


# working hours to display the proper reservation
@api_view(["GET"]) 
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication]) 
def working(request):
    days = WorkingHour.objects.all()
    serializer = WorkingHoursSerializer( days, many=True)
    return Response(data= serializer.data, status=status.HTTP_201_CREATED)

# admin access to edit working hours 
@api_view(['PUT'])
@permission_classes([IsAdminUser]) 
@authentication_classes([TokenAuthentication])
def edit_working(request):
    appointment = WorkingHour.objects.get(day= request.data['day'] )
    serializer = WorkingHoursSerializer(instance = appointment,data = request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# login and auth views
@api_view(["POST"])  
def signup(request):
    user = UserSerializerCreation(data=request.data)
    if user.is_valid():
        user.save()
        users = User.objects.get(username= user.data['username'])
        retruned = UserSerializer(users)
        Token.objects.create(user=users)
        return Response(data= retruned.data, status=status.HTTP_201_CREATED)
    return Response(data=user.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def logout(request):
    request.user.auth_token.delete()
    return Response({'msg': 'User Logged out'}, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def reset(request):
    user = User.objects.get(email= request.data['email'])
    if request.data['new_password'] != request.data['new_password2']:
        raise serializers.ValidationError(
                {
                   'password': "Password doesn't match"
               }
           )
    user.set_password(request.data['new_password'])
    user.save()
    return Response({'msg': 'Password changed'}, status=status.HTTP_202_ACCEPTED)

# end of auth views


# admin views to see all appointments
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def view_all(request):
    appointments = Appointment.objects.all()
    serializer = AppointmentViewSerializer(appointments, many=True)
    return Response(data= serializer.data, status=status.HTTP_202_ACCEPTED)

# client views to see his appointments
@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def view_client(request):

    appointments = Appointment.objects.filter(created_by = request.user.id)
    serializer = AppointmentViewSerializer(appointments, many=True)
    return Response(data= serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def reserve(request):

    data = {
        'created_by': request.user.id,
        'appointment_time': request.data['appointment_time'],
        'status': request.data['status']

    }
    serializer = AppointmentAddSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# client view to cancel the appointment
@api_view(['PUT'])
@permission_classes([IsAuthenticated]) 
@authentication_classes([TokenAuthentication])
def delete_appointment(request, id):
    appointment = Appointment.objects.get(id= id )
    serializer = AppointmentViewSerializer(instance = appointment,data = request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)        


@api_view(['PUT'])
@permission_classes([IsAdminUser]) # accessed by admin only to edit the appointment
@authentication_classes([TokenAuthentication])
def edit_status(request):
    appointment = Appointment.objects.get(id= request.data['id'] )
    serializer = AppointmentViewSerializer(instance = appointment,data = request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# client access to request a new reservation
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def reschedule(request):
    appointment = Appointment.objects.get(id= request.data['id'] )
    serializer = AppointmentViewSerializer(instance = appointment,data = request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



