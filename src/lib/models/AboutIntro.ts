import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutIntro extends Document {
  heading: string;
  tagline: string;
  story: string;
  vision: string;
  mission: string;
  purpose: string;
  bgImage: string;
}

const AboutIntroSchema = new Schema<IAboutIntro>({
  heading: { type: String, default: 'About Himalya Sparsh' },
  tagline: { type: String, default: 'Born from the Himalayas, powered by science' },
  story: { type: String, default: 'Himalya Sparsh was founded with a vision to bring the pristine purity of Himalayan water to every home. Our journey began in the foothills of the world\'s mightiest mountains, where we discovered the secret to truly pure, mineral-rich water.' },
  vision: { type: String, default: 'To make pure Himalayan water accessible to every household in India and beyond.' },
  mission: { type: String, default: 'To innovate and deliver scientifically advanced water solutions that preserve nature\'s purity while ensuring health and wellness for all.' },
  purpose: { type: String, default: 'Empowering lives through clean, natural, and scientifically enhanced water solutions.' },
  bgImage: { type: String, default: '' },
});

export default mongoose.models.AboutIntro || mongoose.model<IAboutIntro>('AboutIntro', AboutIntroSchema);
