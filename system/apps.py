from django.apps import AppConfig


class SystemConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'system'
    def ready(self):
        from . import signals
        from jobs import updater
        updater.start()
