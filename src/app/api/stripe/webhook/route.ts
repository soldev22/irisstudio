// src/app/api/stripe/webhook/route.ts
import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { sendConfirmationEmail } from '@/lib/notifications/sendConfirmationEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    console.log('🔔 Stripe Webhook received:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const email = session.customer_email || 'unknown@nowhere.com';
  const product = session.metadata?.product || 'Your Iris Infinity Artwork';

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Sending confirmation to', email);
        await sendConfirmationEmail(email, 'Customer', product, 'success');
        break;
      case 'checkout.session.async_payment_failed':
        console.log('⚠️ Payment failed. Notifying', email);
        await sendConfirmationEmail(email, 'Customer', product, 'fail');
        break;
      case 'checkout.session.async_payment_canceled':
        console.log('😢 Cancelled. Following up with', email);
        await sendConfirmationEmail(email, 'Customer', product, 'cancel');
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }
  } catch (err: any) {
    console.error(`❌ Failed to handle ${event.type}:`, err.message);
  }

  return new Response('ok');
}
