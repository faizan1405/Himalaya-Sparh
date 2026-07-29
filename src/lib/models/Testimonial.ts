import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  customerName: string;
  city: string;
  state: string;
  rating: number;
  reviewType: 'video' | 'written';
  reviewText?: string;
  videoUrl?: string;
  thumbnail?: string;
  purchaseType: string;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  customerName: { type: String, required: true },
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewType: { type: String, enum: ['video', 'written'], required: true },
  reviewText: { type: String, default: '' },
  videoUrl: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  purchaseType: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
