import axios from 'axios';
import { getEnv } from '../config/dotenvConfig.js';
import { Park } from '../models/parkSchema.js';

getEnv();

const BASE_URL = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = process.env.NPS_API_KEY;
const PARKS_PER_PAGE = 5;

export class ParksService {
  constructor(apiClient = axios, apiKey = API_KEY) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;
  }

  // Main method to get parks - tries DB first, then NPS if needed
  async getParks(page = 1) {
    try {
      const start = (page - 1) * PARKS_PER_PAGE;

      // Try getting parks from DB
      let parks = await Park.find()
        .sort({ order: 1 })
        .skip(start)
        .limit(PARKS_PER_PAGE);

      // If not enough parks in database, fetch missing ones
      if (parks.length < PARKS_PER_PAGE) {
        // Get all parks up to current page
        for (let currentStart = 0; currentStart <= start; currentStart += PARKS_PER_PAGE) {
          const newParks = await this.fetchParksFromNPSApi(currentStart);
          if (newParks.length > 0) {
            await Park.insertMany(newParks);
          } else {
            break; // No more parks available from API
          }
        }

        // Get the requested page from DB after fetching all missing parks
        parks = await Park.find()
          .sort({ order: 1 })
          .skip(start)
          .limit(PARKS_PER_PAGE);
      }

      return {
        parks,
        pagination: {
          currentPage: page,
          hasMore: parks.length === PARKS_PER_PAGE
        }
      };
    } catch (error) {
      console.error('Failed to get parks:', error);
      throw new Error('Failed to fetch parks');
    }
  }

  // Fetch and transform parks from NPS API
  async fetchParksFromNPSApi(start) {
    try {
      const { data } = await this.apiClient.get(BASE_URL, {
        params: {
          start,
          limit: PARKS_PER_PAGE,
          api_key: this.apiKey
        }
      });

      // Transform NPS data to match our DB schema
      return data.data.map((park, index) => ({
        order: start + index,
        name: park.fullName,
        city: park.addresses[0]?.city || 'Unknown City',
        state: park.addresses[0]?.stateCode || 'Unknown State',
        description: park.description,
        activities: park.activities.map(a => a.name).slice(0, 5),
        historicalRelevance: park.topics.map(t => t.name).slice(0, 5),
        geolocation: {
          latitude: parseFloat(park.latitude),
          longitude: parseFloat(park.longitude)
        }
      }));
    } catch (error) {
      console.error('Failed to fetch from NPS API:', error);
      return [];
    }
  }
}
