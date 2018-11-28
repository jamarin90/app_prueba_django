from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.


# def home(request):
#     return HttpResponse('Hola feliz navidad!!')
from navidad.models import Persona


def home(request):
    mensaje = 'Hola Feliz navidad'
    return render(request, 'navidad/prueba_1.html', {'mensaje': mensaje})


def list_personas(request):
    personas = Persona.objects.all()
    return render(request, 'navidad/list_personas.html', {'personas': personas})

