from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Appointment, WorkingHour


class UserSerializerCreation(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation')

    def save(self, **kwargs):
        user = User(email = self.validated_data.get('email'),
                    username= self.validated_data.get('username'))

        if self.validated_data.get('password') != self.validated_data.get('password_confirmation'):
            raise serializers.ValidationError(
                {
                   'password': "Password doesn't match"
               }
           )
        user.set_password(self.validated_data.get('password'))
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class AppointmentViewSerializer(serializers.ModelSerializer):
    created_by = UserSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'

class AppointmentAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


class WorkingHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingHour
        fields = '__all__'
