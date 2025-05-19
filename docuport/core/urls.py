from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('upload/', views.upload_file, name='upload'),
    path('download/<int:pk>/', views.download_file, name='download'),
    path('login/', views.login_view, name='login'),  # ✅ Added login API endpoint
    path('get-files/', views.get_user_files, name='get_user_files'),
    path('send-otp/', views.send_otp),
    path('verify-otp/', views.verify_otp),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)