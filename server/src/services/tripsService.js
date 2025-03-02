import { Trip } from '../models/tripSchema.js';
import { v4 as uuidv4 } from 'uuid';

export class TripsService {
  constructor(tripModel = Trip) {
    this.tripModel = tripModel;
  }

  async createTrip(tripId = uuidv4()) {
    try {
      const newTrip = await this.tripModel.findOneAndUpdate(
        { tripId },
        { tripId, tripDetails: [] },
        {
          new: true, // Return new document
          upsert: true, // Create document if doesn't exist
        }
      );

       return { tripId: newTrip.tripId, tripDetails: newTrip.tripDetails };
    } catch (err) {
      console.error('Failed to create trip:', err);
      throw new Error('Failed to create trip');
    }
  }

  async getTripById(tripId) {
    try {
      return await this.tripModel.findOne({ tripId }, 'tripId tripDetails');
    } catch (err) {
      console.error('Failed to fetch trip:', err);
      throw new Error('Failed to fetch trip');
    }
  }
}
