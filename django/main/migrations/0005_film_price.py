# Generated by Django 5.1.3 on 2024-12-18 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_rate_unique_pair'),
    ]

    operations = [
        migrations.AddField(
            model_name='film',
            name='price',
            field=models.FloatField(default=10, verbose_name='price'),
        ),
    ]
