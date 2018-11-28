from django.urls import path

from navidad.views import home, list_personas, ListPersona, crear_persona, ver_persona

app_name = 'navidad'

urlpatterns = [
    path('', home, name='index'),
    path('personas', list_personas, name='listar-personas'),
    path('personas2', ListPersona.as_view(), name='listar-personas-2'),
    path('crear/persona', crear_persona, name='crear-persona'),
    path('ver/persona/<int:id_persona>', ver_persona, name='ver-persona'),
]
