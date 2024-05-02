# myapp/views.py
from django.http import JsonResponse
import jwt
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from user_service import settings
from user_model.models import User
@csrf_exempt
def login(request):
    if request.method == 'POST':
        username = request.POST.get('username',None)
        password = request.POST.get('password',None)

        if username is None:
            if password is None:
                return JsonResponse({"status": 400,"message":"Validate Error","Error":{"username":"username is not null","password":"password is not null"}},status=400)
            else:
                return JsonResponse({"status": 400,"message":"Validate Error","Error":{"username":"username is not null"}},status=400)
        elif password is None:
                return JsonResponse({"status": 400,"message":"Validate Error","Error":{"password":"password is not null"}},status=400)
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
            return JsonResponse({"status": 201,"message":"success","data":{'accessToken': accessToken,'refreshToken': refreshToken}})
        except User.DoesNotExist:
            return JsonResponse({"status": 400,"message":"Validate Error","Error":{"message":"password or username is not correct"}},status=400)
        except Exception as e:
            return JsonResponse({"status": 500,"message":"Serrver Error","Error":{"message":e}},status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
