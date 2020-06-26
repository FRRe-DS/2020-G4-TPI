from django.shortcuts import render
from django.http import JsonResponse

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.exceptions import APIException

from .models import *
from .serializers import *
from . import utils

import requests


# Create your views here.
class HospitalViewSet(viewsets.ModelViewSet):

    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer

    authentication_classes = [JSONWebTokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class ProvinciaViewSet(viewsets.ModelViewSet):

    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer

    authentication_classes = [JSONWebTokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

class PacienteViewSet(viewsets.ModelViewSet):

    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

    authentication_classes = [JSONWebTokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(methods=('get', ), detail=False)
    def asintomaticos(self, *args, **kwargs):
        try:
            asintomaticos = self.queryset.filter(condicion='A')
            resp = []
            for paciente in asintomaticos:
                data = {
                    'id': paciente.id,
                    'nombre': paciente.nombre,
                    'apellido': paciente.apellido,
                }
                resp.append(data)
            return Response({
                'total': len(resp),
                'pacientes': resp
            })
        except Exception as e:
            return JsonResponse(
                data={'code': 500, 'message': str(e)}, status=500
            )


class PacienteList(generics.ListAPIView):
    serializer_class = PacienteSerializer

    def get_queryset(self):
        estado = self.kwargs['estado'].upper()
        # primero chequeamos que sea un estado válido
        if not [e for e in utils.estados_solicitud if e[0] == estado]:
            raise APIException(
                'El estado "{}" recibido no es válido'.format(estado))
        return Paciente.objects.filter(estado=estado)


class MedicoViewSet(viewsets.ModelViewSet):

    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer

    authentication_classes = [JSONWebTokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class RecursoViewSet(viewsets.ModelViewSet):

    queryset = Recurso.objects.all()
    serializer_class = RecursoSerializer

    authentication_classes = [JSONWebTokenAuthentication]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'solicitud':
            return SolicitudRecursoSerializer
        return RecursoSerializer

    @action(methods=('post', ), detail=False)
    def solicitud(self, *args, **kwargs):
        s = self.get_serializer(data=self.request.data)
        s.is_valid(raise_exception=True)
        try:
            # hospital = s.validated_data.get('hospital')
            sr = SolicitudRecurso()
            sr.hospital = s.validated_data.get('hospital')
            sr.motivo = s.validated_data.get('motivo')
            sr.detalle = s.validated_data.get('detalle')
            sr.save()
            # falta lógica para guardar los recursos solicitados
            return Response({
                'id': sr.id,
                'hospital': HospitalSerializer(sr.hospital).data,
                'motivo': sr.motivo,
                'detalle': sr.detalle,
                'estado': sr.estado
            })
        except Exception as e:
            return JsonResponse(
                data={'code': 500, 'message': str(e)}, status=500
            )
