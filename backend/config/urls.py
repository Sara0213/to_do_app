from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.api.urls')),
    path('api/todos/', include('todos.api.urls')),
    # widoki dla tokenow
    path('login/', TokenObtainPairView.as_view(), name='get_token'), # logowanie
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # odnawianie tokena
    path("api-auth/", include("rest_framework.urls"))
]
