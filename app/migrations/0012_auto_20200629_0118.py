# Generated by Django 3.0.7 on 2020-06-29 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_auto_20200629_0042'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solicitudrecursoitem',
            name='cantidad_enviada',
            field=models.IntegerField(blank=True, help_text='Cantidad enviada', null=True),
        ),
    ]