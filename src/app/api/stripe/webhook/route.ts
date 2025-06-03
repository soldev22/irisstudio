// src/app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sendConfirmationEmail } from '@/lib/notifications/sendConfirmationEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature') as string;
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  console.log(`🔔 Stripe Webhook received: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.metadata?.email || 'unknown@nowhere.com';
    const name = session.metadata?.name || 'Unknown';
    const phone = session.metadata?.phone || '';
    const line1 = session.metadata?.address || '';
    const city = session.metadata?.city || '';
    const postcode = session.metadata?.postcode || '';
    const country = session.metadata?.country || '';

    const price = session.metadata?.price || '0.00';
    const title = session.metadata?.title || 'Unknown Product';

    await sendConfirmationEmail(
      email,
      name,
      title,
      false,
      price,
      line1,
      city,
      postcode,
      country
    );

    await sendConfirmationEmail(
      'mike@solutionsdeveloped.co.uk',
      name,
      title,
      true,
      price,
      line1,
      city,
      postcode,
      country
    );
  } else {
    console.warn(`⚠️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
