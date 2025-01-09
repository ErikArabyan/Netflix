from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(
        r'ws/auth/qr-auth/(?P<sessionID>[^/]+)/$', consumers.QrAuth.as_asgi()),
]
