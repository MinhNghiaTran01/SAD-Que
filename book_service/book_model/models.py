from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Author(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Publisher(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Book(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, null=True)
    discount = models.IntegerField(default=0, null=True)  
    publisher_id = models.IntegerField()
    author_id = models.IntegerField()
    category_id = models.IntegerField()
    image = models.TextField(null=True,default="")
    def __str__(self):
        return self.title
