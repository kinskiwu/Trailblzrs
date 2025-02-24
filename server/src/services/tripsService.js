import { Trip } from '../models/tripSchema.js';
import { v4 as uuidv4 } from 'uuid';

export class TripsService {
  constructor(tripModel = Trip) {
    this.tripModel = tripModel;
  }

  async createTrip(tripId = uuidv4()) {
    try {
      const existingTrip = await this.tripModel.findOne({ tripId });
      if (existingTrip) return existingTrip;

      const newTrip = await this.tripModel.create({
        tripId,
        tripDetails: [],
      });

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

  async updateTrip(tripId, parkId, newDate) {
    try {
      const trip = await this.tripModel.findOne({ tripId });
      if (!trip) {
        return null;
      }

      // Remove the park from any existing date in tripDetails
      trip.tripDetails.forEach((day) => {
        day.parks = day.parks.filter((id) => id !== parkId);
      });

      // Check if the date already exists
      let targetDay = trip.tripDetails.find((day) => day.date === newDate);

      if (targetDay) {
        // If date exists, add park
        if (!targetDay.parks.includes(parkId)) {
          targetDay.parks.push(parkId);
        }
      } else {
        // Else create a new entry
        trip.tripDetails.push({ date: newDate, parks: [parkId] });
      }

      await trip.save();
      return { tripId: trip.tripId, tripDetails: trip.tripDetails };
    } catch (err) {
      throw new Error('Failed to update trip');
    }
  }
}
