import { connectToDatabase } from '@/lib/db';
import { NextResponse } from 'next/server';
import { sendBookingConfirmationEmail } from '@/lib/notifications/sendBookingConfirmationEmail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, time, name, email, phone, people } = body;

    const { db } = await connectToDatabase();
    const existing = await db.collection('bookings').findOne({ date, time });

    if (existing) {
      return NextResponse.json({ error: 'Slot already booked' }, { status: 400 });
    }

    await db.collection('bookings').insertOne({
      date,
      time,
      name,
      email,
      phone,
      people,
      createdAt: new Date(),
    });

    // Send confirmation to client
    await sendBookingConfirmationEmail({
      to: email,
      name,
      date,
      time,
      people,
    });

    // Send copy to admin
    await sendBookingConfirmationEmail({
      to: 'mike@solutionsdeveloped.co.uk',
      name,
      date,
      time,
      people,
      isAdminCopy: true,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
