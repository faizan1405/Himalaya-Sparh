import mongoose, { Schema, Document } from 'mongoose';

export interface IDeviceComponent extends Document {
  name: string;
  purpose: string;
  description: string;
  characteristics: string;
  origin?: string;
  image: string;
  order: number;
}

const DeviceComponentSchema = new Schema<IDeviceComponent>({
  name: { type: String, required: true },
  purpose: { type: String, default: '' },
  description: { type: String, default: '' },
  characteristics: { type: String, default: '' },
  origin: { type: String, default: '' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

export default mongoose.models.DeviceComponent || mongoose.model<IDeviceComponent>('DeviceComponent', DeviceComponentSchema);
