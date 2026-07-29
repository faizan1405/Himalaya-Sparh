import mongoose, { Schema, Document } from 'mongoose';

export interface IDistributorInfo extends Document {
  state: string;
  city: string;
  name: string;
  contact: string;
  email: string;
  isActive: boolean;
  launchDate?: string;
}

const DistributorInfoSchema = new Schema<IDistributorInfo>({
  state: { type: String, required: true },
  city: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  launchDate: { type: String, default: '' },
});

export default mongoose.models.DistributorInfo || mongoose.model<IDistributorInfo>('DistributorInfo', DistributorInfoSchema);
