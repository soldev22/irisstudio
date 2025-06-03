// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import PreCheckout from '@/lib/models/PreCheckout';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  try {
    const {
      title,
      price,
      name,
      email,
      phone,
      address,
      city,
      postcode,
      country,
    } = await req.json();

    if (!title || !price || !name || !email || !address || !city || !postcode || !country) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const amountInPence = parseInt(price.replace('£', '').trim()) * 100;

    await dbConnect();

    await PreCheckout.create({
      title,
      price,
      name,
      email,
      phone,
      address,
      city,
      postcode,
      country,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
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
      metadata: {
        title,
        price: (amountInPence / 100).toFixed(2),
        name,
        email,
        phone,
        address,
        city,
        postcode,
        country,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
