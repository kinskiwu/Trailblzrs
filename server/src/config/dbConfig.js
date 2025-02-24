import mongoose from 'mongoose';
import { getEnv } from './dotenvConfig.js';

getEnv();

const MONGODB_URI = process.env.MONGODB_URI;
console.log('Mongodb-uri', MONGODB_URI);

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
