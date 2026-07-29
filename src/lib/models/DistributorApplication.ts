import mongoose, { Schema, Document } from 'mongoose';

export interface IDistributorApplication extends Document {
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

const DistributorApplicationSchema = new Schema<IDistributorApplication>({
  applicantName: { type: String, required: true },
  businessName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  existingBusiness: { type: String, default: '' },
  experience: { type: String, default: '' },
  investment: { type: String, default: '' },
  preferredTerritory: { type: String, default: '' },
  hasWarehouse: { type: Boolean, default: false },
  message: { type: String, default: '' },
  documentUrl: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'reviewed', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DistributorApplication || mongoose.model<IDistributorApplication>('DistributorApplication', DistributorApplicationSchema);
