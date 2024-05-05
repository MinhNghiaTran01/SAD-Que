# myapp/views.py
import jwt
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from user_service import settings
from user_model.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
class LoginView(APIView):
    def post(self,request):
        username = request.data.get('username', None)
        password = request.data.get('password',None)
        if username is None:
            if password is None:
                return Response({"status": 400,"message":"Validate Error","Error":{"username":"username is not null","password":"password is not null"}},status=400)
            else:
                return Response({"status": 400,"message":"Validate Error","Error":{"username":"username is not null"}},status=400)
        elif password is None:
                return Response({"status": 400,"message":"Validate Error","Error":{"password":"password is not null"}},status=400)
        try:
            user = User.objects.get(username=username,password=password)
            print(user)
            accessToken = jwt.encode({
                'user_id': user.id,
                'exp': datetime.now() + timedelta(hours=1)  # Thời gian hết hạn của token
            }, settings.SECRET_KEY, algorithm='HS256')
            refreshToken = jwt.encode({
                'user_id': user.id,
                'exp': datetime.now() + timedelta(days=365*3)  # Thời gian hết hạn của token
            }, settings.SECRET_KEY, algorithm='HS256')
            return Response({"status": 201,"message":"success","data":{'accessToken': accessToken,'refreshToken': refreshToken}})
        except User.DoesNotExist:
            return Response({"status": 400,"message":"Validate Error","Error":{"message":"password or username is not correct"}},status=400)
        except Exception as e:
            return Response({"status": 500,"message":"Serrver Error","Error":{"message":e}},status=400)

        return Response({'error': 'Method not allowed'}, status=405)
