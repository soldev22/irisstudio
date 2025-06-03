import { sendConfirmationEmail } from '@/lib/notifications/sendConfirmationEmail';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15', // or upgrade the Stripe SDK to use later versions
});

export async function POST(req: Request) {
  try {
    const { title, price } = await req.json();

    if (!title || !price) {
      return NextResponse.json({ error: 'Missing title or price' }, { status: 400 });
    }

    const amountInPence = parseInt(price.replace('£', '').trim()) * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card','klarna'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: title },
            unit_amount: amountInPence,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
    });
await sendConfirmationEmail('mike@solutionsdeveloped.co.uk', 'Test User', title);
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
