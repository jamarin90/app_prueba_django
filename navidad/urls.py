from django.urls import path

from navidad.views import home, list_personas

urlpatterns = [
    path('', home, name='index'),
    path('personas', list_personas, name='listar-personas'),
]
