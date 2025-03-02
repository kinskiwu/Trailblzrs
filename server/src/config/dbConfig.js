import mongoose from 'mongoose';
import { getEnv } from './dotenvConfig.js';

getEnv();
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Connect to MongoDB database
 * @returns {mongoose.Connection} Mongoose connection object
 * @throws {Error} If MongoDB URI is not defined or connection fails
 */
export const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error(
      'MongoDB URI is not defined. Please set MONGODB_URI in environment variables.',
    );
  }

  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected successfully...');
  return mongoose.connection;
};
