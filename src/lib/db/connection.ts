import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string | undefined;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV !== 'test') {
    console.warn('MONGODB_URI not set. Database connections will fail until it is configured.');
  }
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}
