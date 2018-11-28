from django.urls import path

from navidad.views import home, list_personas, ListPersona, crear_persona, ver_persona, CrearCiudad, \
    ListCiudad, VerCiudad, ActualizarCiudad, EliminarCiudad

app_name = 'navidad'

urlpatterns = [
    path('', home, name='index'),
    path('personas', list_personas, name='listar-personas'),
    path('personas2', ListPersona.as_view(), name='listar-personas-2'),
    path('crear/persona', crear_persona, name='crear-persona'),
    path('ver/persona/<int:id_persona>', ver_persona, name='ver-persona'),
    path('crear/ciudad', CrearCiudad.as_view(), name='crear-ciudad'),
    path('ciudades', ListCiudad.as_view(), name='listar-ciudades'),
    path('ver/ciudad/<int:pk>', VerCiudad.as_view(), name='ver-ciudad'),
    path('actualizar/ciudad/<int:pk>', ActualizarCiudad.as_view(), name='actualizar-ciudad'),
    path('eliminar/ciudad/<int:pk>', EliminarCiudad.as_view(), name='eliminar-ciudad'),

]
