import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Missing date' }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();

    // Assuming a collection called "bookings"
    const bookings = await db.collection('bookings').find({ date }).toArray();
    const bookedTimes = bookings.map(b => b.time);

    const times = Array.from({ length: 12 }, (_, i) => {
      const hour = i + 9;
      return `${hour.toString().padStart(2, '0')}:00`;
    });

    const availableTimes = times.filter(t => !bookedTimes.includes(t));

    return NextResponse.json({ availableTimes });
  } catch (err) {
    console.error('Booking availability error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
