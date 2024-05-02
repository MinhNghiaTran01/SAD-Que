from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=225)
    password = models.CharField(max_length=225)
class Role(models.Model):
    roleName = models.CharField(max_length=225)
class UserRole(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    role = models.ForeignKey(Role,on_delete=models.CASCADE)
