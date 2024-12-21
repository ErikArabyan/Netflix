from django.db import models


class Singletone(models.Model):
    front_URL = models.URLField('front_URL')

    class Meta:
        abstract = True

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SingletoneModel(Singletone):
    front_URL = models.URLField('front_URL')

    class Meta:
        verbose_name = 'Singletone'
        verbose_name_plural = 'Singletone'

    def __str__(self):
        return 'Singletone'

    def save(self, *args, **kwargs):
        self.pk = 1
        super(SingletoneModel, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.pk = 1
        super(SingletoneModel, self).delete(*args, **kwargs)
