import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  features: string[];
  components: string[];
  stock: number;
  sku: string;
  isActive: boolean;
  slug: string;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  images: [{ type: String }],
  features: [{ type: String }],
  components: [{ type: String }],
  stock: { type: Number, default: 0 },
  sku: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  slug: { type: String, required: true, unique: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
