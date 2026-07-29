import mongoose, { Schema, Document } from 'mongoose';

export interface IScienceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface IDeviceScience extends Document {
  heading: string;
  description: string;
  features: IScienceFeature[];
  disclaimer: string;
  modelUrl?: string;
  posterImage: string;
  updatedAt: Date;
}

const DeviceScienceSchema = new Schema<IDeviceScience>({
  heading: { type: String, default: 'The Science Behind Our Device' },
  description: { type: String, default: 'Our device combines advanced filtration technology with natural Himalayan minerals to deliver pure, healthy water.' },
  features: [{ icon: String, title: String, description: String }],
  disclaimer: { type: String, default: 'All scientific claims are based on laboratory testing. Please refer to lab reports for detailed information.' },
  modelUrl: { type: String, default: '' },
  posterImage: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.DeviceScience || mongoose.model<IDeviceScience>('DeviceScience', DeviceScienceSchema);
