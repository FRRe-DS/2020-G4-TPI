from django.conf import settings
from django.urls import path, re_path, include

from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions
from rest_framework_jwt.views import (
    obtain_jwt_token, refresh_jwt_token, verify_jwt_token)

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from .views import *

# coreapi docs
schema_view = get_schema_view(
    openapi.Info(
        title='2020-G4-TPI API Docs',
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# drf-yasg docs
schema_view = get_schema_view(
   openapi.Info(
      title='2020-G4-TPI API Docs',
      default_version='v1',
      description='Documentación Trabajo Práctico Integrador - DACS - G4',
      license=openapi.License(name='GNU General Public License v3.0'),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

if settings.DEBUG:
    router = SimpleRouter()
else:
    router = DefaultRouter()

router.register('provincia', ProvinciaViewSet, basename='provincia')
router.register('hospital', HospitalViewSet, basename='hospital')
router.register('paciente', PacienteViewSet, basename='paciente')
router.register('medico', MedicoViewSet, basename='medico')
router.register('recurso', RecursoViewSet, basename='recurso')
router.register('solicitud', SolicitudRecursoViewSet, basename='solicitud')

urlpatterns = [
    path(r'', include((router.urls, 'api'), namespace='api')),
    path(r'auth/get-token/', obtain_jwt_token),
    path(r'auth/refresh-token/', refresh_jwt_token),
    path(r'auth/verify-token/', verify_jwt_token),
    path(r'docs/', include_docs_urls(title='2020-G4-TPI API Docs',
                                     authentication_classes=[],
                                     permission_classes=[])),
    re_path(r'swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(
             cache_timeout=0), name='schema-json'),
    path(r'swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path(r'redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
    re_path('^paciente/estado/(?P<estado>.+)/$', PacienteList.as_view()),
]
