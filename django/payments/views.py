from rest_framework.authtoken.models import Token
from django.shortcuts import redirect
import stripe
from django.views.decorators.csrf import csrf_exempt
from Film import settings
from main.models import Film
from django.http import JsonResponse
from .models import *
from singletone.models import SingletoneModel

@csrf_exempt
def create_checkout_session(request, id):
    if request.method == 'GET':
        domain_url = request.build_absolute_uri()
        stripe.api_key = settings.STRIPE_SECRET_KEY
        token_key = request.headers.get('Authorization').replace('Token ', '')
        token = Token.objects.get(key=token_key)
        user = token.user.email
        try:
            film = Film.objects.get(id=id)
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url +
                'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'cancelled/',
                payment_method_types=['card'],
                mode='payment',
                line_items=[
                    {'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': film.name,
                        },
                        'unit_amount': int(film.price*100),
                    },
                        'quantity': 1,
                    },
                ],
                metadata={
                    'user_id': str(user)
                },
            )
            return JsonResponse({'url': checkout_session.url})
        except Exception as e:
            return JsonResponse({'error': str(e)})


def success(request):
    stripe.api_key = "sk_test_51QX0yBIO5AXqdrLmP8C2NsnxQTXMvpGoJRqBaElJvbM3HpPD8vCeAhCozAPaq9PMT69zxJbJkTNVnPg2tMtgyTgw00lTEuWnAu"
    session = request.GET.get('session_id')
    session1 = stripe.checkout.Session.retrieve(session)
    user = session1.metadata.user_id
    userModel = User.objects.get(email=user)
    Payment.objects.create(checkout_session_id=session, user=userModel)
    site_settings = SingletoneModel.load()
    site_url = site_settings.front_URL
    return redirect(f'{site_url}success/')

def cancel(request):
    site_settings = SingletoneModel.load()
    site_url = site_settings.front_URL
    return redirect(f'{site_url}cancel/')
