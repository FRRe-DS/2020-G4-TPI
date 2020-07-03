from django.db import models
from django.core.validators import MaxValueValidator
from django.contrib.auth.models import User

from . import utils


class Provincia(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    def __unicode__(self):
        return self.nombre


class Hospital(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=150)
    localidad = models.CharField(max_length=100)
    provincia = models.ForeignKey(
        to=Provincia,
        related_name='hospitales',
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name_plural = 'hospitales'

    def __str__(self):
        return self.nombre

    def __unicode__(self):
        return self.nombre


class Recurso(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=300, blank=True, null=True)
    estado = models.BooleanField(
        default=False, help_text='Si hay disponibilidad o no del recurso')
    cantidad = models.IntegerField(
        default=0, help_text='Stock disponible del recurso')

    def __str__(self):
        return self.nombre


class Persona(models.Model):
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    dni = models.IntegerField(unique=True, help_text='Solo números')
    direccion = models.CharField(
        max_length=200, null=True, blank=True,
        help_text='Direccion donde reside'
    )
    localidad = models.CharField(
        max_length=200, null=True, blank=True, default='Resistencia',
        help_text='Localidad donde reside'
    )
    genero = models.CharField(
        max_length=1,
        choices=utils.generos,
        default='M',
    )
    fecha_nacimiento = models.DateField()

    class Meta:
        abstract = True

    def __str__(self):
        return '{} {}'.format(self.nombre, self.apellido)


class Medico(Persona):
    matricula = models.CharField(unique=True, max_length=30)
    max_pacientes = models.IntegerField(validators=[MaxValueValidator(100)])
    hospital = models.ForeignKey(
        to=Hospital,
        related_name='medicos',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )


# Create your models here.
class Paciente(Persona):
    estado = models.CharField(
        max_length=2,
        choices=utils.estados,
        default='N',
        help_text='Estado en que se encuentra el paciente'
    )
    condicion = models.CharField(
        max_length=2,
        choices=utils.condiciones,
        default='A',
        help_text='Sintomático o asintomático',
    )
    patologias = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(
        blank=True, null=True, auto_now_add=True,
        help_text='Fecha de confirmación del caso como COVID-19 positivo')
    fecha_alta = models.DateTimeField(blank=True, null=True)
    fecha_defuncion = models.DateTimeField(blank=True, null=True)
    medico = models.ForeignKey(
        to=Medico,
        related_name='pacientes',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    hospital = models.ForeignKey(
        to='Hospital',
        related_name='pacientes',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )


class Solicitud(models.Model):
    motivo = models.CharField(max_length=100)
    detalle = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_respuesta = models.DateTimeField(blank=True, null=True)
    estado = models.CharField(
        max_length=1,
        choices=utils.estados_solicitud,
        default='P',
    )
    respuesta = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.motivo

    def __unicode__(self):
        return self.motivo


class SolicitudRecurso(Solicitud):
    hospital = models.ForeignKey(
        to='Hospital',
        related_name='solicitudes',
        on_delete=models.CASCADE,
    )
    recursos = models.ManyToManyField(
        to=Recurso,
        related_name='solicitudes',
        through='SolicitudRecursoItem'
    )
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)


class SolicitudRecursoItem(models.Model):
    solicitudrecurso = models.ForeignKey(
        SolicitudRecurso, on_delete=models.CASCADE)
    recurso = models.ForeignKey(Recurso, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, help_text='Cantidad solicitada')
    cantidad_enviada = models.IntegerField(
        blank=True, null=True, help_text='Cantidad enviada')
