import mongoose from 'mongoose';
const { Schema } = mongoose;

const parkSchema = new Schema({
  order: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true,
    uppercase: true
  },
  description: {
    type: String,
    trim: true
  },
  activities: {
    type: [String],
    default: []
  },
  historicalTopics: {
    type: [String],
    default: []
  },
  geolocation: {
    latitude: {
      type: String
    },
    longitude: {
      type: String
    }
  }
}, {
  timestamps: true
});

// TTL for 7 days
parkSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const Park = mongoose.model('Park', parkSchema);