from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render

# Create your views here.


# def home(request):
#     return HttpResponse('Hola feliz navidad!!')
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView

from navidad.forms import CrearPersonaForm
from navidad.models import Persona, Pais, Ciudad


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


class CrearCiudad(CreateView):
    model = Ciudad
    fields = ['nombre', 'estado']
    template_name = 'navidad/crear_ciudad.html'
    success_url = reverse_lazy('navidad:listar-ciudades')


class ListCiudad(ListView):
    model = Ciudad
    template_name = 'navidad/list_ciudades.html'


class VerCiudad(DetailView):
    model = Ciudad
    template_name = 'navidad/detalle_ciudad.html'


class ActualizarCiudad(UpdateView):
    model = Ciudad
    fields = ['nombre', 'estado']
    template_name = 'navidad/crear_ciudad.html'
    success_url = reverse_lazy('navidad:listar-ciudades')


class EliminarCiudad(DeleteView):
    model = Ciudad
    template_name = 'navidad/ciudad_confirm_delete.html'
    success_url = reverse_lazy('navidad:listar-ciudades')