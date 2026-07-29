import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import DistributorApplication from '@/lib/models/DistributorApplication';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.applicantName || !body.businessName || !body.email || !body.phone || !body.state || !body.city || !body.consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const application = await DistributorApplication.create(body);
    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
