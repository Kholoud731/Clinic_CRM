from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include
from .views import signup, logout, reset, view_all, reserve, delete_appointment, edit_status,reschedule, view_client, working, user_details, edit_working

urlpatterns = [
    #login and user auth urls
    path('signin/', obtain_auth_token ,name='api_token_auth'), # login and sending token 
    path('signup/', signup, name='signup'),
    path('logout/', logout, name='logout'),
    path('reset/', reset, name='reset'),

    #appointment urls
    path('view-all/', view_all, name='view_all'),
    path('view-client/', view_client, name='view_client'),
    path('reserve/', reserve, name='reserve'),
    path('reschedule/',reschedule , name='reschedule'),
    path('delete-appointment/<int:id>', delete_appointment, name='delete_appointment'),
    path('edit-status/', edit_status, name='edit_status'),

    #working hours to reserve 
    path('working/', working, name='working'),
    path('edit-working/', edit_working, name='edit_working'),
    path('user-details/', user_details, name='user_details'),

]
