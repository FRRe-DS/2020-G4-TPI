# Generated by Django 3.0.6 on 2020-05-28 19:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20200528_1923'),
    ]

    operations = [
        migrations.CreateModel(
            name='SolicitudRecursoItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.IntegerField(default=1, help_text='Cantidad solicitada')),
                ('recurso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Recurso')),
                ('solicitudRecurso', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.SolicitudRecurso')),
            ],
        ),
        migrations.RemoveField(
            model_name='solicitudrecurso',
            name='recursos',
        ),
        migrations.AddField(
            model_name='solicitudrecurso',
            name='recursos',
            field=models.ManyToManyField(related_name='solicitudes', through='app.SolicitudRecursoItem', to='app.Recurso'),
        ),
    ]