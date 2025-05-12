from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, FileResponse
from .models import Document
from .forms import DocumentForm
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User 
from django.core.files.uploadedfile import UploadedFile


# LOGIN FUNCTIONALITY
@login_required
def dashboard(request):
    docs = Document.objects.filter(user=request.user)
    return render(request, 'core/dashboard.html', {'documents': docs})

@login_required
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES.get('file')
        user_id = request.POST.get('user_id')

        if not file or not user_id:
            return JsonResponse({'error': 'Missing file or user_id'}, status=400)

        # TODO: Handle saving the file if needed, associate with user_id, etc.

        return JsonResponse({'message': 'Upload successful'}, status=200)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@login_required
def download_file(request, pk):
    doc = Document.objects.get(id=pk, user=request.user)
    return FileResponse(doc.file, as_attachment=True)

@login_required
def get_user_files(request):
    user_id = request.GET.get('user_id')

    if not user_id:
        return JsonResponse({'error': 'User ID not provided'}, status=400)

    try:
        user = User.objects.get(id=user_id)
        documents = Document.objects.filter(user=user)
        file_list = [{
            'id': doc.id,
            'filename': doc.file.name.split('/')[-1],
            'upload_time': doc.upload_time.strftime('%Y-%m-%d %H:%M:%S'),
        } for doc in documents]
        return JsonResponse(file_list, safe=False)

    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

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
        