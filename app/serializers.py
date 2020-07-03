from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from datetime import datetime

from .models import *
from .utils import *


class ProvinciaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provincia
        fields = '__all__'


class HospitalSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hospital
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['provincia'] = ProvinciaSerializer(instance.provincia).data
        return response


class PacienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paciente
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['medico'] = MedicoSerializer(instance.medico).data
        response['hospital'] = HospitalSerializer(instance.hospital).data
        return response


class MedicoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medico
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['hospital'] = HospitalSerializer(instance.hospital).data
        return response


class RecursoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Recurso
        fields = '__all__'


class SolicitudRecursoItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = SolicitudRecursoItem
        fields = ['cantidad', 'cantidad_enviada']

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['recurso'] = {
            'id': instance.recurso.id,
            'nombre': instance.recurso.nombre,
            'descripcion': instance.recurso.descripcion
        }
        return response


class SolicitudRecursoSerializer(serializers.ModelSerializer):

    recursos = SolicitudRecursoItemSerializer(
        source='solicitudrecursoitem_set', many=True)

    class Meta:
        model = SolicitudRecurso
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        for estado in utils.estados_solicitud:
            if estado[0] == instance.estado:
                response['estado'] = estado[1]
        response['hospital'] = HospitalSerializer(instance.hospital).data
        response['usuario'] = instance.usuario.username
        return response


class SolicitudRecursoItemCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = SolicitudRecursoItem
        fields = ['recurso', 'cantidad']


class SolicitudRecursoCreateSerializer(serializers.ModelSerializer):
    recursos = serializers.ListField(
        write_only=True,
        help_text='Array de recursos solicitados',
        child=SolicitudRecursoItemCreateSerializer()
    )

    class Meta:
        model = SolicitudRecurso
        fields = ['hospital', 'motivo', 'detalle', 'recursos']

    def create(self, validated_data):
        instance = SolicitudRecurso()
        instance.motivo = validated_data.get('motivo')
        instance.detalle = validated_data.get('detalle')
        instance.hospital = validated_data.get('hospital')
        instance.usuario = self.context['request'].user
        instance.save()
        for rec in validated_data.get('recursos'):
            rec_dict = dict(rec)
            item = SolicitudRecursoItem()
            item.solicitudrecurso = instance
            item.recurso = rec_dict['recurso']
            item.cantidad = rec_dict['cantidad']
            item.save()
        return instance

    def to_representation(self, instance):
        s = SolicitudRecursoSerializer()
        return s.to_representation(instance)


class SolicitudRecursoItemUpdateSerializer(serializers.Serializer):
    recurso = serializers.IntegerField(
        write_only=True,
        help_text='ID de recurso',
    )
    cantidad_enviada = serializers.IntegerField(
        write_only=True,
        help_text='Cantidad enviada',
    )


class SolicitudRecursoUpdateSerializer(serializers.ModelSerializer):
    recursos = serializers.ListField(
        write_only=True,
        help_text='Array de recursos solicitados (respuesta)',
        child=SolicitudRecursoItemUpdateSerializer()
    )

    class Meta:
        model = SolicitudRecurso
        fields = ['estado', 'respuesta', 'recursos']

    def update(self, instance, validated_data):
        for rec in validated_data.get('recursos'):
            rec_dict = dict(rec)
            item = instance.solicitudrecursoitem_set.all().get(
                recurso__id=rec_dict['recurso'])
            item.cantidad_enviada = rec_dict['cantidad_enviada']
            item.save()
        instance.fecha_respuesta = datetime.now()
        instance.respuesta = validated_data.get('respuesta')
        instance.estado = validated_data.get('estado')
        instance.save()
        return instance

    def to_representation(self, instance):
        s = SolicitudRecursoSerializer()
        return s.to_representation(instance)
