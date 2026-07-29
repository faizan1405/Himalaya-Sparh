import mongoose, { Schema, Document } from 'mongoose';

export type ContentType =
  | 'hero'
  | 'about'
  | 'settings'
  | 'leadership'
  | 'components'
  | 'science'
  | 'howItWorks'
  | 'labReports'
  | 'testimonials'
  | 'product'
  | 'faqs'
  | 'orders'
  | 'enquiries'
  | 'founderDelivery'
  | 'distributor'
  | 'partnership';

export interface Content extends Document {
  type: ContentType;
  data: Record<string, any>;
  updatedAt: Date;
}

const ContentSchema = new Schema<Content>(
  {
    type: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: { updatedAt: 'updatedAt' } }
);

export const mongooseModels = mongoose.models || {};
export const ContentModel = mongooseModels.Content || mongoose.model<Content>('Content', ContentSchema);
