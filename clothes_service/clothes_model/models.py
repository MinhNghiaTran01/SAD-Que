from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class Clothes(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    discount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  
    image = models.TextField()  
    category_id =  models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  
    def __str__(self):
        return self.name
