from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class SocialMediaHandle(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name

class ScheduledPost(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=50, default="00:00:00")
    handle = models.ForeignKey(SocialMediaHandle, on_delete=models.CASCADE)

    def __str__(self):
        return self.title