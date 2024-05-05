from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Clothes(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    discount = models.IntegerField()
    image = models.TextField()  
    category_id =  models.IntegerField()  
    def __str__(self):
        return self.name
