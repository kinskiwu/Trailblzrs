import axios from 'axios';
import { getEnv } from '../config/dotenvConfig.js';
import { Park } from '../models/parkSchema.js';

getEnv();

const BASE_URL = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = process.env.NPS_API_KEY;

if (!API_KEY) {
  throw new Error(
    'API_KEY is not defined. Please set the NPS_API_KEY environment variable.',
  );
}

export class ParksService {
  constructor(apiClient = axios, apiKey = API_KEY, parkModel = Park) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;
    this.parkModel = parkModel;
  }

  /**
   * Fetches parks from the NPS API with pagination
   * @param {number} page - The page number (default: 1)
   * @param {number} limit - Number of parks per page (default: 6)
   * @returns {Promise<{parks: object[]}>} - A list of formatted park objects
   * @throws {Error} - Throws an error if the API request fails
   */
  async getParks(page = 1, limit = 6, state = null) {
    try {
      // Calculate start parameter
      const start = (page - 1) * limit;

      // Build query params
      const params = {
        start,
        limit,
        api_key: this.apiKey,
      };

      // Add state code if provided
      if (state) {
        params.stateCode = state.toUpperCase();
      }

      // Fetch parks from NPS API
      const { data } = await this.apiClient.get(BASE_URL, { params });

      if (!data || !data.data) {
        throw new Error('Invalid response from NPS API');
      }

      // Transform NPS API response
      const parks = data.data.map((park) => ({
        parkId: park.id,
        image: park.images?.length > 0 ? park.images[0].url : '',
        name: park.fullName,
        city: park.addresses?.[0]?.city || '',
        state: park.addresses?.[0]?.stateCode || '',
        description: park.description,
        activities: park.activities?.map((a) => a.name) || [],
        historicalRelevance: park.topics?.map((t) => t.name) || [],
        npsLink: `https://www.nps.gov/${park.parkCode}`,
        directions: park.directionsUrl || '',
        geolocation: {
          latitude: parseFloat(park.latitude) || null,
          longitude: parseFloat(park.longitude) || null,
        },
      }));

      // Save parks to MongoDB if they are new
      for (const park of parks) {
        await this.parkModel.findOneAndUpdate({ parkId: park.parkId }, park, {
          upsert: true,
          new: true,
        });
      }

      return {
        parks,
      };
    } catch (error) {
      console.error('Failed to fetch parks:', error);
      throw new Error(`Failed to fetch parks: ${error.message}`);
    }
  }

  /**
   * Fetches multiple parks by their parkIds from the database
   * @param {string[]} parkIds - Array of park IDs
   * @returns {Promise<object[]>} - List of park objects
   */
  async getParksByIds(parkIds) {
    try {
      return await this.parkModel.find({ parkId: { $in: parkIds } });
    } catch (error) {
      console.error('Error fetching parks from database:', error);
      throw new Error('Failed to fetch parks');
    }
  }
}
