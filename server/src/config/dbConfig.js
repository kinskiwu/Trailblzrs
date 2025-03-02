import mongoose from 'mongoose';
import { getEnv } from './dotenvConfig.js';

getEnv();
const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error(
      'MongoDB URI is not defined. Please set MONGODB_URI in environment variables.'
    );
  }

  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected successfully...');
  return mongoose.connection;
};
