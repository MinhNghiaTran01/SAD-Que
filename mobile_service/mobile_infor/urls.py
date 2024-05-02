from django.urls import path
from .views import MobileList,MobileDetail

urlpatterns = [
    path('mobiles', MobileList.as_view(), name='mobile-list'),
    path('mobile/<int:pk>', MobileDetail.as_view(), name='mobile-detail'),

]
