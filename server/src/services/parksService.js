import axios from 'axios';
import { getEnv } from '../config/dotenvConfig.js';
import { Park } from '../models/parkSchema.js';

getEnv();

const BASE_URL = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = process.env.NPS_API_KEY;

export class ParksService {
  constructor(apiClient = axios, apiKey = API_KEY) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;
  }

  async getParks(page = 1, limit = 6) {
    try {
      // Calculate start parameter
      const start = (page - 1) * limit;

      // Fetch parks from NPS API
      const { data } = await this.apiClient.get(BASE_URL, {
        params: {
          start,
          limit,
          api_key: this.apiKey,
        },
      });

      if (!data || !data.data) {
        throw new Error('Invalid response from NPS API');
      }

      // Transform NPS API response
      const parks = data.data.map(park => ({
        parkId: park.id,
        image: park.images?.length > 0 ? park.images[0].url : '',
        name: park.fullName,
        city: park.addresses?.[0]?.city || '',
        state: park.addresses?.[0]?.stateCode || '',
        description: park.description,
        activities: park.activities?.map(a => a.name).slice(0, 5) || [],
        historicalRelevance: park.topics?.map(t => t.name).slice(0, 5) || [],
        npsLink: `https://www.nps.gov/${park.parkCode}`,
        directions: park.directionsUrl || '',
        geolocation: {
          latitude: parseFloat(park.latitude) || null,
          longitude: parseFloat(park.longitude) || null,
        },
      }));

      return {
        parks
      };
    } catch (error) {
      console.error('Failed to fetch parks:', error);
      throw new Error(`Failed to fetch parks: ${error.message}`);
    }
  }
}
