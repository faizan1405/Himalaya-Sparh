import mongoose, { Schema, Document } from 'mongoose';

export interface ILeadership extends Document {
  name: string;
  designation: string;
  biography: string;
  photo: string;
  linkedin?: string;
  order: number;
}

const LeadershipSchema = new Schema<ILeadership>({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  biography: { type: String, default: '' },
  photo: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Leadership || mongoose.model<ILeadership>('Leadership', LeadershipSchema);
