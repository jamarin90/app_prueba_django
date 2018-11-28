from django.contrib import admin

# Register your models here.
from navidad.models import Persona, Pais, Ciudad, Regalo, Estado


@admin.register(Persona)
class PersonaAdmin(admin.ModelAdmin):
    list_display = ["usuario", "direccion", "fecha_nacimiento"]

    class Meta:
        model = Persona


@admin.register(Pais)
class PaisAdmin(admin.ModelAdmin):

    class Meta:
        model = Pais

@admin.register(Ciudad)
class CiudadAdmin(admin.ModelAdmin):
    class Meta:
        model = Ciudad


@admin.register(Estado)
class EstadoAdmin(admin.ModelAdmin):
    class Meta:
        model = Estado

@admin.register(Regalo)
class RegaloAdmin(admin.ModelAdmin):
    class Meta:
        model = Regalo