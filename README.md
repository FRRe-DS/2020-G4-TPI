# 2020-G4-TPI

Trabajo Práctico Integrador - Grupo 4 - 2020

### Integrantes 🤓
  - Andrik, Ivan Danel.
  - Britos, Miguel Antonio.
  - Montero Cura, Facundo Farid.
  - Soto, Horacio Oscar.
  - Villegas, Cesar Manuel.

### Frameworks y librerías 🛠️

_A continuación listamos las tecnologías utilizadas en el proyecto_

* [Django 3.0](https://www.djangoproject.com/) - a high-level Python Web framework that encourages rapid development and clean, pragmatic design.
* [Django REST framework 3.11](https://www.django-rest-framework.org/) - Django REST framework is a powerful and flexible toolkit for building Web APIs.
* [Docker](https://www.docker.com/) - Docker is a set of platform as a service (PaaS) products that uses OS-level virtualization to deliver software in packages called containers.
* [PostgreSQL](https://www.postgresql.org/) - The World's Most Advanced Open Source Relational Database.

### Pre-requisitos 📋

_Tener instalado Docker y Docker Compose en la máquina donde se va a ejecutar_

### Instalación 🔧

1. Clonar este repositorio

```
git clone https://github.com/FRRe-DACS/2020-G4-TPI.git 2020-g4-tpi
```

2. Ir a la carpeta del proyecto

```
cd 2020-g4-tpi
```

3. Crear la carpeta **postgres_data**

```
mkdir postgres_data
```

4. Ejecutar el comando

```
docker-compose up -d --build
```

5. Correr las migraciones del proyecto

```
docker-compose exec app python manage.py migrate --noinput
```

6. Abrir el navegador e ingresar a **http://127.0.0.1:8000/api/swagger/** para ver la documentación

7. Abrir el navegador e ingresar a **http://127.0.0.1:3000/** para ver la aplicación

En caso de tener algún problema al momento de la instalación o para obtener más detalles consultar este [tutorial](https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/)

## Licencia 📄

GNU General Public License v3.0
