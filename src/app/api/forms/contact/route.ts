import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SiteSettings from '@/lib/models/SiteSettings';

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
