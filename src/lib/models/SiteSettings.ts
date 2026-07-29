import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
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
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  siteName: { type: String, default: 'Himalya Sparsh' },
  tagline: { type: String, default: 'By the Himalaya, from the Himalayas' },
  email: { type: String, default: 'info@himalyaspersh.com' },
  phone: { type: String, default: '+91 98765 43210' },
  whatsappNumber: { type: String, default: '+919876543210' },
  address: { type: String, default: '' },
  businessHours: { type: String, default: 'Mon - Sat: 10:00 AM - 6:00 PM' },
  socialLinks: {
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
  },
  seo: {
    title: { type: String, default: 'Himalya Sparsh - Pure Himalayan Water Solution' },
    description: { type: String, default: 'Experience pure Himalayan water with our scientifically designed device. Natural wellness, advanced technology.' },
    keywords: [{ type: String }],
    ogImage: { type: String, default: '' },
  },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
