import { connectDB } from '@/lib/db/connection';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SiteSettings from '@/lib/models/SiteSettings';
import HeroContent from '@/lib/models/HeroContent';
import AboutIntro from '@/lib/models/AboutIntro';
import Leadership from '@/lib/models/Leadership';
import DeviceScience from '@/lib/models/DeviceScience';
import DeviceComponent from '@/lib/models/DeviceComponent';
import HowItWorksStep from '@/lib/models/HowItWorksStep';
import LabReport from '@/lib/models/LabReport';
import Testimonial from '@/lib/models/Testimonial';
import Product from '@/lib/models/Product';
import Order from '@/lib/models/Order';
import FounderDeliveryRequest from '@/lib/models/FounderDeliveryRequest';
import DistributorInfo from '@/lib/models/DistributorInfo';
import DistributorApplication from '@/lib/models/DistributorApplication';
import PartnershipEnquiry from '@/lib/models/PartnershipEnquiry';
import ContactEnquiry from '@/lib/models/ContactEnquiry';
import Faq from '@/lib/models/Faq';

function getModels() {
  return {
    SiteSettings, HeroContent, AboutIntro, Leadership,
    DeviceScience, DeviceComponent, HowItWorksStep, LabReport,
    Testimonial, Product, Order, FounderDeliveryRequest,
    DistributorInfo, DistributorApplication, PartnershipEnquiry,
    ContactEnquiry, Faq,
  };
}

async function fetchAll() {
  const m = getModels();
  return {
    settings: await m.SiteSettings.findOne().lean(),
    hero: await m.HeroContent.findOne().lean(),
    aboutIntro: await m.AboutIntro.findOne().lean(),
    leadership: await m.Leadership.find().sort({ order: 1 }).lean(),
    deviceScience: await m.DeviceScience.findOne().lean(),
    deviceComponents: await m.DeviceComponent.find().sort({ order: 1 }).lean(),
    howItWorksSteps: await m.HowItWorksStep.find().sort({ step: 1 }).lean(),
    labReports: await m.LabReport.find().lean(),
    testimonials: await m.Testimonial.find().lean(),
    products: await m.Product.find().lean(),
    orders: await m.Order.find().lean(),
    founderDeliveryRequests: await m.FounderDeliveryRequest.find().lean(),
    distributorInfo: await m.DistributorInfo.find().lean(),
    distributorApplications: await m.DistributorApplication.find().lean(),
    partnershipEnquiries: await m.PartnershipEnquiry.find().lean(),
    contactEnquiries: await m.ContactEnquiry.find().lean(),
    faqs: await m.Faq.find().sort({ order: 1 }).lean(),
  };
}

export async function GET(request: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured. Set MONGODB_URI in .env' }, { status: 503 });
    }
    await connectDB();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const data = await fetchAll();
    if (type) return NextResponse.json((data as any)[type] || null);
    return NextResponse.json(data);
  } catch (e: any) {
    if (e.message?.includes('MONGODB_URI')) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    await connectDB();
    const session = await getServerSession(authOptions as any);
    if (!session || (session as any).user?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const body = await request.json();
    const m = getModels();

    let result;
    switch (type) {
      case 'settings':
        result = await m.SiteSettings.findOneAndUpdate({}, body, { new: true, upsert: true });
        break;
      case 'hero':
        result = await m.HeroContent.findOneAndUpdate({}, body, { new: true, upsert: true });
        break;
      case 'aboutIntro':
        result = await m.AboutIntro.findOneAndUpdate({}, body, { new: true, upsert: true });
        break;
      case 'leadership':
        result = await m.Leadership.create(body);
        break;
      case 'deviceScience':
        result = await m.DeviceScience.findOneAndUpdate({}, body, { new: true, upsert: true });
        break;
      case 'deviceComponent':
        result = await m.DeviceComponent.create(body);
        break;
      case 'howItWorks':
        result = await m.HowItWorksStep.create(body);
        break;
      case 'labReport':
        result = await m.LabReport.create(body);
        break;
      case 'testimonial':
        result = await m.Testimonial.create(body);
        break;
      case 'product':
        result = await m.Product.create(body);
        break;
      case 'faq':
        result = await m.Faq.create(body);
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save content' }, { status: 500 });
  }
}
