from django.shortcuts import render
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

# -------------------------------
# CSRF exemption for local testing
# -------------------------------
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # skip CSRF checks (safe only for local testing)

# -------------------------------
# Task API
# -------------------------------
class TaskViewSet(viewsets.ModelViewSet):
    """
    API for CRUD operations on Tasks
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = [AllowAny]

# -------------------------------
# Homepage view for index.html
# -------------------------------
def home(request):
    """
    Serves the frontend index.html page
    """
    return render(request, 'index.html')
