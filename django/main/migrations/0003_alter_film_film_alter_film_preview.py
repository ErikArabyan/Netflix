# Generated by Django 5.1.3 on 2024-12-04 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_alter_film_film'),
    ]

    operations = [
        migrations.AlterField(
            model_name='film',
            name='film',
            field=models.ManyToManyField(related_name='Film', to='main.video'),
        ),
        migrations.AlterField(
            model_name='film',
            name='preview',
            field=models.ManyToManyField(related_name='Preview', to='main.preview'),
        ),
    ]