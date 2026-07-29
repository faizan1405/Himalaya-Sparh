// src/types/index.ts
export interface SiteSettings {
  _id?: string;
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  businessHours: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  updatedAt?: Date;
}

export interface HeroContent {
  _id?: string;
  heading: string;
  subheading: string;
  tagline: string;
  description: string;
  bgImage: string;
  deviceImage: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
}

export interface AboutIntro {
  _id?: string;
  heading: string;
  tagline: string;
  story: string;
  vision: string;
  mission: string;
  purpose: string;
  bgImage: string;
}

export interface Leadership {
  _id?: string;
  name: string;
  designation: string;
  biography: string;
  photo: string;
  linkedin?: string;
  order: number;
}

export interface DeviceScience {
  _id?: string;
  heading: string;
  description: string;
  features: ScienceFeature[];
  disclaimer: string;
  modelUrl?: string;
  posterImage: string;
}

export interface ScienceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface DeviceComponent {
  _id?: string;
  name: string;
  purpose: string;
  description: string;
  characteristics: string;
  origin?: string;
  image: string;
  order: number;
}

export interface HowItWorksStep {
  _id?: string;
  step: number;
  heading: string;
  description: string;
  icon: string;
}

export interface LabReport {
  _id?: string;
  laboratory: string;
  testType: string;
  date: string;
  summary: string;
  category: string;
  fileUrl: string;
  thumbnail: string;
  verificationInfo: string;
}

export interface Testimonial {
  _id?: string;
  customerName: string;
  city: string;
  state: string;
  rating: number;
  reviewType: 'video' | 'written';
  reviewText?: string;
  videoUrl?: string;
  thumbnail?: string;
  purchaseType: string;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt?: Date;
}

export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features: string[];
  components: string[];
  stock: number;
  sku: string;
  isActive: boolean;
  slug: string;
}

export interface Order {
  _id?: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: { productId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  trackingNumber?: string;
  createdAt: Date;
}

export interface FounderDeliveryRequest {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  pincode: string;
  preferredDate: string;
  units: number;
  message: string;
  consent: boolean;
  status: 'pending' | 'approved' | 'scheduled' | 'delivered' | 'cancelled';
  createdAt: Date;
}

export interface DistributorInfo {
  _id?: string;
  state: string;
  city: string;
  name: string;
  contact: string;
  email: string;
  isActive: boolean;
  launchDate?: string;
}

export interface DistributorApplication {
  _id?: string;
  applicantName: string;
  businessName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  existingBusiness: string;
  experience: string;
  investment: string;
  preferredTerritory: string;
  hasWarehouse: boolean;
  message: string;
  documentUrl?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface PartnershipEnquiry {
  _id?: string;
  fullName: string;
  companyName: string;
  designation: string;
  phone: string;
  email: string;
  website?: string;
  city: string;
  state: string;
  partnershipType: string;
  message: string;
  attachmentUrl?: string;
  status: 'pending' | 'reviewed' | 'responded';
  createdAt: Date;
}

export interface ContactEnquiry {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  status: 'unread' | 'read' | 'responded' | 'closed';
  createdAt: Date;
}

export interface Faq {
  _id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface AdminUser {
  _id?: string;
  email: string;
  name: string;
  role: 'super_admin' | 'content_manager' | 'order_manager' | 'enquiry_manager';
  password?: string;
}
