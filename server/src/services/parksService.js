import axios from 'axios';
import { getEnv } from '../config/dotenvConfig.js';

getEnv();

const BASE_URL = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = process.env.NPS_API_KEY;

export class ParksService {
  constructor(apiClient = axios, apiKey = API_KEY) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;

    if (!this.apiKey) {
      throw new Error('NPS API key is not configured');
    }
  }

  async fetchParks() {
    try {
      const url = `${BASE_URL}?limit=5&api_key=${this.apiKey}`;
      const { data } = await this.apiClient.get(url);

      if (!data || !Array.isArray(data.data)) {
        throw new Error('Invalid response format from NPS API');
      }

      return data.data.map((park, index) => ({
        order: index + 1,
        name: park.fullName,
        state: park.states,
        npsLink: park.url,
        location: park.addresses,
        activities: park.activities,
        historicalRelevance: park.topics,
        directions: park.directionsUrl,
        parkCode: park.parkCode,
        description: park.description,
      }));
    } catch (err) {
      console.error('Failed to fetch parks:', err.message);
      throw new Error(`Failed to fetch parks: ${err.message}`);
    }
  }
}
