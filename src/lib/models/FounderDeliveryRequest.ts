import mongoose, { Schema, Document } from 'mongoose';

export interface IFounderDeliveryRequest extends Document {
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

const FounderDeliveryRequestSchema = new Schema<IFounderDeliveryRequest>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  preferredDate: { type: String, required: true },
  units: { type: Number, required: true },
  message: { type: String, default: '' },
  consent: { type: Boolean, required: true },
  status: { type: String, enum: ['pending', 'approved', 'scheduled', 'delivered', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.FounderDeliveryRequest || mongoose.model<IFounderDeliveryRequest>('FounderDeliveryRequest', FounderDeliveryRequestSchema);
