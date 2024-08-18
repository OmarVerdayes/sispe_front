// stripeService.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('tu_clave_publica_de_stripe');

export const checkout = async (priceId) => {
  const stripe = await stripePromise;

  const response = await fetch('http://localhost:3000/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });

  const { sessionId } = await response.json();
  const { error } = await stripe.redirectToCheckout({ sessionId });

  if (error) {
    console.error('Error en Stripe:', error);
  }
};
