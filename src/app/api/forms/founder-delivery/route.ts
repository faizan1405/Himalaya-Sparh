import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import FounderDeliveryRequest from '@/lib/models/FounderDeliveryRequest';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.state || !body.city || !body.pincode || !body.consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const requestData = await FounderDeliveryRequest.create(body);
    return NextResponse.json({ success: true, data: requestData }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}
