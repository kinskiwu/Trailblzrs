import mongoose from 'mongoose';

const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    tripId: { type: String, unique: true },
    tripDetails: [
      {
        date: { type: Date, required: true },
        parks: [{ type: String, ref: 'Park', required: true }],
      },
    ],
  },
  { timestamps: true },
);

export const Trip = mongoose.model('Trip', tripSchema);
