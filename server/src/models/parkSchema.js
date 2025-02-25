import mongoose from 'mongoose';
const { Schema } = mongoose;

const parkSchema = new Schema(
  {
    parkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    image: { type: String },
    name: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    activities: {
      type: [String],
      default: [],
    },
    historicalRelevance: {
      type: [String],
      default: [],
    },
    npsLink: { type: String },
    directions: { type: String, trim: true },
    geolocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const Park = mongoose.model('Park', parkSchema);
