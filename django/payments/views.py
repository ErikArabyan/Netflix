from django.shortcuts import redirect
import stripe
from django.views.decorators.csrf import csrf_exempt
from Film import settings
from main.models import Film
from django.http import JsonResponse
from .models import *


@csrf_exempt
def create_checkout_session(request, id):
    if request.method == 'GET':
        domain_url = 'http://' + request.get_host()+'/'
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            film = Film.objects.get(id=id)
            checkout_session = stripe.checkout.Session.create(
                success_url=domain_url +
                'success?session_id={CHECKOUT_SESSION_ID}',
                cancel_url=domain_url + 'cancelled/',
                payment_method_types=['card'],
                mode='payment',
                customer='erik',
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
                ]
            )
            return redirect(checkout_session.url, code=303)
        except Exception as e:
            return JsonResponse({'error': str(e)})

def success(request):
    stripe.api_key = "sk_test_51QX0yBIO5AXqdrLmP8C2NsnxQTXMvpGoJRqBaElJvbM3HpPD8vCeAhCozAPaq9PMT69zxJbJkTNVnPg2tMtgyTgw00lTEuWnAu"
    session = request.GET.get('session_id')
    session1 = stripe.checkout.Session.retrieve(session)
    print(session1.customer)
    # user = stripe.Customer.retrieve(session1.customer)
    # Payment.objects.create(checkout_session_id=session)
