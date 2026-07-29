import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import AboutIntro from '@/lib/models/AboutIntro';

export async function GET() {
  try {
    await connectDB();
    const data = await AboutIntro.findOne().lean();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const result = await AboutIntro.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to save about content' }, { status: 500 });
  }
}