from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Producer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Type(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Mobile(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.IntegerField()    
    producer_id = models.IntegerField()
    type_id = models.IntegerField()    
    category_id = models.IntegerField()
    image = models.TextField(null=True,default="")  
    def __str__(self):
        return self.name
