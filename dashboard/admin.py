from django.contrib import admin

# Register your models here.

from .models import SocialMediaHandle, ScheduledPost

admin.site.register(SocialMediaHandle)

admin.site.register(ScheduledPost)

