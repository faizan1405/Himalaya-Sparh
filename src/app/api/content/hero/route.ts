import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import HeroContent from '@/lib/models/HeroContent';

export async function GET() {
  try {
    await connectDB();
    const data = await HeroContent.findOne().lean();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const result = await HeroContent.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Failed to save hero content' }, { status: 500 });
  }
}