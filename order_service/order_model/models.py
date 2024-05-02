from django.db import models
from django.contrib.auth.models import User

class Order(models.Model):
    quantity = models.IntegerField(default=1)
    date_ordered = models.DateTimeField(auto_now_add=True)
    product_id = models.IntegerField()  # Trường ID của sản phẩm
    user_id = models.IntegerField()  # Trường ID của người dùng đặt hàng

    # Thêm các trường khác cần thiết cho đơn hàng như địa chỉ giao hàng, trạng thái đơn hàng, v.v.

    def __str__(self):
        return f"Order #{self.pk}"
