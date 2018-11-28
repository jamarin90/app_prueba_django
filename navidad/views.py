from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.


# def home(request):
#     return HttpResponse('Hola feliz navidad!!')


def home(request):
    mensaje = 'Hola Feliz navidad'
    return render(request, 'navidad/prueba_1.html', {'mensaje': mensaje})

