from django.urls import path
from .views import MobileList,MobileDetail

urlpatterns = [
    path('mobile', MobileList.as_view(), name='mobile-list'),
    path('mobile/<int:pk>', MobileDetail.as_view(), name='mobile-detail'),

]
