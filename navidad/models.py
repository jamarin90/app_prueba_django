from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Pais(models.Model):
    nombre = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = "paises"

    def __unicode__(self):
        return str(self.nombre)

    def __str__(self):
        return str(self.nombre)


class Estado(models.Model):
    nombre = models.CharField(max_length=50)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "estados"

    def __unicode__(self):
        return str(self.nombre)

    def __str__(self):
        return str(self.nombre)


class Ciudad(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    estado = models.ForeignKey(Estado, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "ciudades"

    def __unicode__(self):
        return str(self.nombre)

    def __str__(self):
        return str(self.nombre)


class Persona(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField(auto_now_add=False)
    direccion = models.CharField(max_length=50)
    sexo = models.CharField(max_length=10)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    ciudad = models.ForeignKey(Ciudad, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = "personas"

    def __unicode__(self):
        return str(self.usuario)

    def __str__(self):
        return str(self.usuario)


class Regalo(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=100)
    fecha = models.DateField(auto_now_add=False)

    class Meta:
        verbose_name_plural = "Regalos"

    def __unicode__(self):
        return str(self.persona)

    def __str__(self):
        return str(self.persona)
