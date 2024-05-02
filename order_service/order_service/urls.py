"""order_service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('orderproduct/',include('order_model.urls')),
    path('orderinfor/',include('order_infor.urls'))
]
from django.db import models  
  
# Create your models here.  
  
class Students(models.Model):  
    first_name = models.CharField(max_length=200)  
    last_name = models.CharField(max_length=200)  
    address = models.CharField(max_length=200)  
    roll_number = models.IntegerField()  
    mobile = models.CharField(max_length=10)  
  
    def __str__(self):  
        return self.first_name + " " + self.last_name  
