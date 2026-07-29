import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroContent extends Document {
  heading: string;
  subheading: string;
  tagline: string;
  description: string;
  bgImage: string;
  deviceImage: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
  updatedAt: Date;
}

const HeroContentSchema = new Schema<IHeroContent>({
  heading: { type: String, default: 'Pure Water, Himalayan Soul' },
  subheading: { type: String, default: 'By the Himalaya, from the Himalayas' },
  tagline: { type: String, default: 'Nature\'s Finest, Scientifically Preserved' },
  description: { type: String, default: 'Experience the purity of Himalayan water with our revolutionary water device. Scientifically designed, naturally inspired.' },
  bgImage: { type: String, default: '' },
  deviceImage: { type: String, default: '' },
  buttonText1: { type: String, default: 'Explore the Device' },
  buttonLink1: { type: String, default: '/device/science' },
  buttonText2: { type: String, default: 'Buy Now' },
  buttonLink2: { type: String, default: '/buy' },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.HeroContent || mongoose.model<IHeroContent>('HeroContent', HeroContentSchema);
