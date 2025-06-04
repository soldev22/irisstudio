import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
// Update the import path if the file exists elsewhere, or create the file if missing.


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      address,
      city,
      postcode,
      country,
      product,
      price,
    } = body;

    if (!email || !product || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('orders').insertOne({
      name,
      email,
      phone,
      address,
      city,
      postcode,
      country,
      product,
      price,
      createdAt: new Date(),
    });




    return NextResponse.json({ status: 'ok', id: result.insertedId });
  } catch (err: any) {
    console.error('❌ Precheckout failed:', err.message);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
