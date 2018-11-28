from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.


# def home(request):
#     return HttpResponse('Hola feliz navidad!!')
from django.urls import reverse_lazy
from django.views.generic import ListView

from navidad.forms import CrearPersonaForm
from navidad.models import Persona


def home(request):
    mensaje = 'Hola Feliz navidad'
    return render(request, 'navidad/prueba_1.html', {'mensaje': mensaje})


def list_personas(request):
    personas = Persona.objects.all()
    return render(request, 'navidad/list_personas.html', {'personas': personas})


class ListPersona(ListView):
    model = Persona
    template_name = 'navidad/list_personas.html'


def crear_persona(request):
    if request.POST:
        form = CrearPersonaForm(request.POST)
        if form.is_valid():
            nombres = form.cleaned_data.get('nombres')
            apellidos = form.cleaned_data.get('apellidos')
            password = form.cleaned_data.get('password')
            ciudad = form.cleaned_data.get('ciudad')
            direccion = form.cleaned_data.get('direccion')
            email = form.cleaned_data.get('email')
            sexo = form.cleaned_data.get('sexo')
            fecha_nacimiento = form.cleaned_data.get('fecha_nacimiento')
            user = User.objects.create_user(email, email, password)
            user.first_name = nombres
            user.last_name = apellidos
            user.save()
            persona = Persona(usuario=user, ciudad=ciudad, direccion=direccion, sexo=sexo, fecha_nacimiento=fecha_nacimiento)
            persona.save()
            return HttpResponseRedirect(reverse_lazy('navidad:listar-personas'))

    else:
        form = CrearPersonaForm()
        return render(request, 'navidad/crear_personas.html', {'form': form})


def ver_persona(request, id_persona):
    persona = Persona.objects.get(pk=id_persona)
    return render(request, 'navidad/ver_persona.html', {'persona': persona})