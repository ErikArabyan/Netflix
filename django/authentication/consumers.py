from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
import json

class QrAuth(AsyncWebsocketConsumer):
    async def connect(self):
        self.sessionID = self.scope['url_route']['kwargs']['sessionID']
        self.room_group_name = f'session_{self.sessionID}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    @sync_to_async
    def get_user_from_token(self, token_key):
        from rest_framework.authtoken.models import Token
        try:
            token_obj = Token.objects.get(key=token_key)
            user = token_obj.user
            return user
        except Token.DoesNotExist:
            return None

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        token = text_data_json.get('token')

        if not token:
            await self.send(text_data=json.dumps({
                'event': "error",
                'message': "No token provided"
            }))
            return

        user = await self.get_user_from_token(token)
        if user:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'send_authenticated',
                    "given_name": user.username,
                    "email": user.email,
                    "picture": user.image.url,
                    "token": token,
                }
            )
        else:
            await self.send(text_data=json.dumps({
                'event': "error",
                'message': "Invalid or expired token"
            }))

    async def send_authenticated(self, event):
        await self.send(text_data=json.dumps({
            'event': "authenticated",
            'given_name': event['given_name'],
            'email': event['email'],
            'picture': event['picture'],
            'token': event['token'],
        }))
