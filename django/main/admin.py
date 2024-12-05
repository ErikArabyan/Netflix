from django.contrib import admin
from .models import *


admin.site.register(Nomination)

class FilmModel(admin.ModelAdmin):
    exclude = ['rate']

admin.site.register(Film, FilmModel)
admin.site.register(Cinematography)
admin.site.register(Video)
admin.site.register(Preview)
admin.site.register(Trailer)
admin.site.register(Teaser)
admin.site.register(Genre)
