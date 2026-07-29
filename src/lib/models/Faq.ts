import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  category: string;
  order: number;
}

const FaqSchema = new Schema<IFaq>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 },
});

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);
