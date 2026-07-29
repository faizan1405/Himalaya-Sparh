import mongoose, { Schema, Document } from 'mongoose';

export interface IPartnershipEnquiry extends Document {
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

const PartnershipEnquirySchema = new Schema<IPartnershipEnquiry>({
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, required: true },
  partnershipType: { type: String, required: true },
  message: { type: String, default: '' },
  attachmentUrl: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'reviewed', 'responded'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PartnershipEnquiry || mongoose.model<IPartnershipEnquiry>('PartnershipEnquiry', PartnershipEnquirySchema);
