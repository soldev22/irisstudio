import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  const body = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'klarna'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: { name: body.title },
          unit_amount: parseInt(body.price) * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
