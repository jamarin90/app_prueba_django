from django import forms

from .models import Persona, Ciudad


class CrearPersonaForm(forms.Form):
    nombres = forms.CharField(label="Nombres",
                              widget=forms.TextInput(attrs={'class': 'form-control'}))
    apellidos = forms.CharField(label="Apellidos",
                                widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label="Password",
                                widget=forms.TextInput(attrs={'class': 'form-control', 'type': 'password'}))
    ciudad = forms.ModelChoiceField(label="Ciudad", queryset=Ciudad.objects.all(),
                                       widget=forms.Select(attrs={'class': 'form-control'}))
    direccion = forms.CharField(label="Dirección",
                                widget=forms.TextInput(attrs={'class': 'form-control',
                                                             'rows': '3', 'cols': '12'}))
    email = forms.EmailField(label="Email")
    CHOICES = [('masculino', 'M'),
               ('femenino', 'F')]
    sexo = forms.ChoiceField(label='Sexo', choices=CHOICES, widget=forms.RadioSelect())
    fecha_nacimiento = forms.DateField(label="Fecha nacimiento",
                                       widget=forms.DateInput(attrs={'class': 'form-control'}))
