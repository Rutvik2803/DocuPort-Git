from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, FileResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login
from django.core.files.uploadedfile import UploadedFile
from django.core.mail import send_mail
from django.utils import timezone

import json
import random
from datetime import timedelta

from .models import Document, OTP
from .forms import DocumentForm

# ------------------- Existing Functionality -------------------

@login_required
def dashboard(request):
    docs = Document.objects.filter(user=request.user)
    return render(request, 'core/dashboard.html', {'documents': docs})

@login_required
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file')

        if not file:
            return JsonResponse({'error': 'Missing file'}, status=400)

        Document.objects.create(user=request.user, file=file)

        return JsonResponse({'message': 'Upload successful'}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)
@login_required
def download_file(request, pk):
    doc = Document.objects.get(id=pk, user=request.user)
    return FileResponse(doc.file, as_attachment=True)

@login_required
def get_user_files(request):
    documents = Document.objects.filter(user=request.user)
    file_list = [{
        'id': doc.id,
        'filename': doc.file.name.split('/')[-1],
        'uploaded_at': doc.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
    } for doc in documents]
    return JsonResponse(file_list, safe=False)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(request, email=data['email'], password=data['password'])
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'user_id': user.id})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)

# ------------------- OTP Functionality -------------------

@csrf_exempt
def send_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        # Generate 6-digit OTP
        otp_code = str(random.randint(100000, 999999))

        # Save OTP
        OTP.objects.create(email=email, code=otp_code)

        # Send OTP via email
        send_mail(
            subject='Your OTP Code',
            message=f'Your OTP code is: {otp_code}',
            from_email=None,  # Use DEFAULT_FROM_EMAIL from settings
            recipient_list=[email],
        )

        return JsonResponse({'message': 'OTP sent successfully'}, status=200)

@csrf_exempt
def verify_otp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        code = data.get('code')

        if not email or not code:
            return JsonResponse({'error': 'Email and code are required'}, status=400)

        expiry_time = timezone.now() - timedelta(minutes=10)
        otp = OTP.objects.filter(email=email, code=code, created_at__gte=expiry_time).last()

        if otp:
            user, created = User.objects.get_or_create(username=email, email=email)
            user.backend = 'django.contrib.auth.backends.ModelBackend'  # IMPORTANT: Set backend here
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'user_id': user.id}, status=200)

        return JsonResponse({'error': 'Invalid or expired OTP'}, status=400)

