import mongoose from 'mongoose';

const { Schema } = mongoose;

const tripSchema = new Schema(
  {
    tripId: {
      type: String,
      unique: true,
    },
    tripDetails: [
      {
        date: {
          type: String,
        },
        parkDetails: [
          {
            parkId: { type: String },
            parkName: { type: String },
            state: { type: String },
            npsLink: { type: String },
            directions: { type: String },
          },
        ],
        forecastDetails: [
          {
            parkId: { type: String },
            high: { type: Number },
            low: { type: Number },
            weather: { type: String },
            windSpeed: { type: String },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  },
);
export const Trip = mongoose.model('Trip', tripSchema);
