# Generated by Django 5.1.3 on 2024-12-05 14:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Cinematography',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Cinematography Name')),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='genres')),
            ],
        ),
        migrations.CreateModel(
            name='Nomination',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='Nomination Name')),
            ],
        ),
        migrations.CreateModel(
            name='Preview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='preview', verbose_name='Preview')),
            ],
        ),
        migrations.CreateModel(
            name='Teaser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teaser', models.FileField(upload_to='teasers', verbose_name='Teaser')),
            ],
        ),
        migrations.CreateModel(
            name='Trailer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('trailer', models.FileField(upload_to='trailers', verbose_name='Trailer')),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='films', verbose_name='Film')),
            ],
        ),
        migrations.CreateModel(
            name='Film',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('budget', models.IntegerField(verbose_name='Budget')),
                ('release_date', models.DateField(auto_now_add=True, verbose_name='Release Date')),
                ('image', models.FileField(upload_to='images', verbose_name='Film Image')),
                ('art_directors', models.ManyToManyField(limit_choices_to={'is_art_director': True}, related_name='art_directors', to=settings.AUTH_USER_MODEL)),
                ('cinematography', models.ManyToManyField(related_name='films', to='main.cinematography')),
                ('directors', models.ManyToManyField(limit_choices_to={'is_director': True}, related_name='directors', to=settings.AUTH_USER_MODEL)),
                ('distributed_by', models.ManyToManyField(limit_choices_to={'is_distributor': True}, related_name='distributed_films', to=settings.AUTH_USER_MODEL)),
                ('editors', models.ManyToManyField(limit_choices_to={'is_editor': True}, related_name='editors', to=settings.AUTH_USER_MODEL)),
                ('genres', models.ManyToManyField(related_name='Genre', to='main.genre')),
                ('nominations', models.ManyToManyField(related_name='films', to='main.nomination')),
                ('preview', models.ManyToManyField(related_name='Preview', to='main.preview')),
                ('teaser', models.ManyToManyField(related_name='Teaser', to='main.teaser')),
                ('trailer', models.ManyToManyField(related_name='Trailer', to='main.trailer')),
                ('film', models.ManyToManyField(related_name='Film', to='main.video')),
            ],
        ),
    ]
