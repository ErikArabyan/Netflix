from django.db import models
from authentication.models import User
from django.utils.translation import gettext_lazy as _


class Cinematography(models.Model):
    name = models.CharField('Cinematography Name', max_length=255)
    
    def __str__(self):
        return str(self.name)

class Nomination(models.Model):
    name = models.CharField('Nomination Name', max_length=128)
    
    def __str__(self):
        return str(self.name)

class Film(models.Model):
    name = models.CharField('Name', max_length=255)
    nominations = models.ManyToManyField('Nomination', related_name='films')
    cinematography = models.ManyToManyField('Cinematography', related_name='films')
    directors = models.ManyToManyField(User, limit_choices_to={'is_director': True}, related_name=_('directors'))
    distributed_by = models.ManyToManyField(User, limit_choices_to={'is_distributor': True}, related_name=_('distributed_films'))
    art_directors = models.ManyToManyField(User, limit_choices_to={'is_art_director': True}, related_name=_('art_directors'))
    editors = models.ManyToManyField(User, limit_choices_to={'is_editor': True}, related_name=_('editors'))
    # rate = models.ForeignKey(Rate, on_delete=models.CASCADE, null=True, related_name='rateit')
    budget = models.IntegerField('Budget')
    release_date = models.DateField('Release Date', auto_now_add=True)
    image = models.FileField('Film Image', upload_to='images')
    film = models.ManyToManyField("Video", related_name='Film')
    preview = models.ManyToManyField("Preview", related_name='Preview')
    trailer = models.ManyToManyField("Trailer", related_name='Trailer')
    teaser = models.ManyToManyField("Teaser", related_name='Teaser')
    genres = models.ManyToManyField('Genre', related_name="Genre")

    def __str__(self):
        return self.name 
    
class Rate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    film = models.ForeignKey(Film,on_delete=models.CASCADE)
    rate = models.IntegerField('rate')
    
class Genre(models.Model):
    name = models.CharField('genres', max_length=255)
    
    def __str__(self):
        return str(self.name)
    
class Video(models.Model):
    video = models.FileField('Film', upload_to='films')

    def __str__(self):
        return str(self.video)
    
class Preview(models.Model):
    video = models.FileField('Preview', upload_to='preview')

    def __str__(self):
        return str(self.video)
    
class Trailer(models.Model):
    trailer = models.FileField('Trailer', upload_to='trailers')
    
    def __str__(self):
        return str(self.trailer)
    
class Teaser(models.Model):
    teaser = models.FileField('Teaser', upload_to='teasers')
    
    def __str__(self):
        return str(self.teaser)
    