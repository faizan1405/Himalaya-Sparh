import mongoose, { Schema, Document } from 'mongoose';

export interface ILabReport extends Document {
  laboratory: string;
  testType: string;
  date: string;
  summary: string;
  category: string;
  fileUrl: string;
  thumbnail: string;
  verificationInfo: string;
  createdAt: Date;
}

const LabReportSchema = new Schema<ILabReport>({
  laboratory: { type: String, required: true },
  testType: { type: String, required: true },
  date: { type: String, required: true },
  summary: { type: String, default: '' },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  verificationInfo: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.LabReport || mongoose.model<ILabReport>('LabReport', LabReportSchema);
