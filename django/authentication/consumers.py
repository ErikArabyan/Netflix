from channels.generic.websocket import AsyncWebsocketConsumer
import json


class QrAuth(AsyncWebsocketConsumer):
    async def connect(self):
        self.sessionID = self.scope['url_route']['kwargs']['sessionID']
        self.room_group_name = f'session_{self.sessionID}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        token = text_data_json.get('token')
        if not token:
            await self.send(text_data=json.dumps({
                'event': "error",
                'message': "No token provided"
            }))
            return
        user = self.authenticate_token(token)
        if user:
            await self.send(text_data=json.dumps({
                'event': "authenticated",
                'message': f"Welcome, {user.username}!"
            }))
            await self.send_message_to_group(f"{user.username} has logged in.")
        else:
            await self.send(text_data=json.dumps({
                'event': "error",
                'message': "Invalid or expired token"
            }))
