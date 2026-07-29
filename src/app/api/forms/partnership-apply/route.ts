import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import PartnershipEnquiry from '@/lib/models/PartnershipEnquiry';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.fullName || !body.companyName || !body.email || !body.phone || !body.partnershipType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const enquiry = await PartnershipEnquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
