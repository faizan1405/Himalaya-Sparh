import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  email: string;
  name: string;
  password: string;
  role: 'super_admin' | 'content_manager' | 'order_manager' | 'enquiry_manager';
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['super_admin', 'content_manager', 'order_manager', 'enquiry_manager'],
    default: 'content_manager',
  },
  createdAt: { type: Date, default: Date.now },
});

AdminSchema.pre('save', async function (this: IAdmin, next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

AdminSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, (this as any).password);
};

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
