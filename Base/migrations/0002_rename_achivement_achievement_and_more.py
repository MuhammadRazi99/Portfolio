# Generated by Django 5.1.1 on 2024-09-08 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Base', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Achivement',
            new_name='Achievement',
        ),
        migrations.RenameModel(
            old_name='Certifate',
            new_name='Certificate',
        ),
    ]
