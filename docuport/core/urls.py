from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('upload/', views.upload_file, name='upload'),
    path('download/<int:pk>/', views.download_file, name='download'),
    path('login/', views.login_view, name='login'),  # ✅ Added login API endpoint
    path('get-files/', views.get_user_files, name='get_user_files'),
]
