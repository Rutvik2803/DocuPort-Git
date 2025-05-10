from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, FileResponse
from .models import Document
from .forms import DocumentForm
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# LOGIN FUNCTIONALITY
@login_required
def dashboard(request):
    docs = Document.objects.filter(user=request.user)
    return render(request, 'core/dashboard.html', {'documents': docs})

@login_required
def upload_file(request):
    if request.method=="POST":
        form=DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            doc = form.save(commit=False)
            doc.user = request.user
            doc.save()
            return redirect('dashboard')
    else:
        form = DocumentForm()
    return render(request, 'core/upload.html', {'form': form})

@login_required
def download_file(request, pk):
    doc = Document.objects.get(id=pk, user=request.user)
    return FileResponse(doc.file, as_attachment=True)



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