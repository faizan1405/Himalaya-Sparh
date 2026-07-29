import mongoose, { Schema, Document } from 'mongoose';

export interface IHowItWorksStep extends Document {
  step: number;
  heading: string;
  description: string;
  icon: string;
}

const HowItWorksStepSchema = new Schema<IHowItWorksStep>({
  step: { type: Number, required: true },
  heading: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
});

export default mongoose.models.HowItWorksStep || mongoose.model<IHowItWorksStep>('HowItWorksStep', HowItWorksStepSchema);
