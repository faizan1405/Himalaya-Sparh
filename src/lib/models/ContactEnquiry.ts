import mongoose, { Schema, Document } from 'mongoose';

export interface IContactEnquiry extends Document {
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

const ContactEnquirySchema = new Schema<IContactEnquiry>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  enquiryType: { type: String, required: true },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  status: { type: String, enum: ['unread', 'read', 'responded', 'closed'], default: 'unread' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ContactEnquiry || mongoose.model<IContactEnquiry>('ContactEnquiry', ContactEnquirySchema);
