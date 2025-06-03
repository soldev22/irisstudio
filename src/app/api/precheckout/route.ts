import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import PreCheckout from '@/lib/models/PreCheckout'; // Adjust path if you store models elsewhere

const MONGODB_URI = process.env.MONGODB_URI!;

export async function POST(req: NextRequest) {
  try {
    if (!mongoose.connections[0]?.readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    const data = await req.json();
    const saved = await PreCheckout.create(data);

    return NextResponse.json({ success: true, id: saved._id });
  } catch (err: any) {
    console.error('Error saving precheckout:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
