from django.urls import path
from . import views

urlpatterns = [
    path('', views.summary, name="summary"),
    path('analytics/<str:pk>', views.other, name="other"),
    path('schedule-post/', views.schedule_post_page, name="schedule_post_page"),
    path('add-new-handle/', views.add_new_handle, name="add_new_handle"),
    path('schedule-post/add', views.schedule_post, name="schedule_post"),
    path('schedule-post/delete', views.delete_scheduled_post, name="delete_scheduled_post"),
    path('schedule-post/edit/', views.edit_scheduled_post, name="edit_scheduled_post"),
    path('add-new-handle/', views.add_new_handle, name="add_new_handle"),
    path('sign-in/', views.loginPage, name='loginPage'),
    path('sign-up/', views.signUp, name='signUp'),
    path('logout/', views.logoutUser, name='logout'),
]



