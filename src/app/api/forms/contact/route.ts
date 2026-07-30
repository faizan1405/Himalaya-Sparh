import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import SiteSettings from '@/lib/models/SiteSettings';
import ContactEnquiry from '@/lib/models/ContactEnquiry';
import { sendEmail } from '@/lib/utils/email';

export async function GET() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne().lean();
    return NextResponse.json({
      phone: settings?.phone || '+91 98765 43210',
      email: settings?.email || 'info@himalyaspersh.com',
      whatsapp: settings?.whatsappNumber || '+919876543210',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.name || !body.email || !body.phone || !body.message || !body.consent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const enquiry = await ContactEnquiry.create(body);

    // Send notification email
    try {
      await sendEmail({
        to: process.env.RESEND_NOTIFICATION_EMAIL || 'info@himalyaspersh.com',
        subject: `New Contact Enquiry: ${body.subject || 'No subject'}`,
        html: `
          <h2>New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone}</p>
          <p><strong>Type:</strong> ${body.enquiryType || 'General'}</p>
          <p><strong>Subject:</strong> ${body.subject || 'N/A'}</p>
          <p><strong>Message:</strong> ${body.message}</p>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
    }

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}