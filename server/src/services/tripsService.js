import { Trip } from '../models/tripSchema.js';
import { v4 as uuidv4 } from 'uuid';

export class TripsService {
  constructor(tripModel = Trip) {
    this.tripModel = tripModel;
  }

  /**
   * Creates a new trip with trip details
   * @param {Array} tripDetails - Array of trip details (each with date, park, and forecast)
   * @param {string} [tripId=uuidv4()] - Optional trip ID
   * @returns {Object} Created trip
   */
  async createTrip(tripDetails, tripId = uuidv4()) {
    try {
      const trip = await this.tripModel.findOneAndUpdate(
        { tripId },
        { tripId, tripDetails },
        { new: true, upsert: true },
      );

      return { tripId: trip.tripId };
    } catch (err) {
      console.error('Failed to create trip:', err);
      throw new Error(`Failed to create trip: ${err.message}`);
    }
  }

  /**
   * Retrieves a trip by its ID
   */
  async getTripById(tripId) {
    try {
      const trip = await this.tripModel.findOne(
        { tripId },
        'tripId tripDetails',
      );
      console.log('Fetched trip:', trip); // Debug
      return trip;
    } catch (err) {
      console.error('Failed to fetch trip:', err);
      throw new Error('Failed to fetch trip');
    }
  }
}
