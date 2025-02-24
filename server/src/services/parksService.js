import axios from 'axios';
import { getEnv } from '../config/dotenvConfig.js';
import { Park } from '../models/parkSchema.js';

getEnv();

const BASE_URL = 'https://developer.nps.gov/api/v1/parks';
const API_KEY = process.env.NPS_API_KEY;
const PARKS_PER_PAGE = 6;

export class ParksService {
  constructor(apiClient = axios, apiKey = API_KEY) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;
  }

  async getParks(page = 1) {
    try {
      page = parseInt(page, 10);
      if (isNaN(page) || page < 1) page = 1;

      const start = (page - 1) * PARKS_PER_PAGE;
      if (start < 0) throw new Error('Invalid page number');

      // Try getting parks from DB
      let parks = await Park.find()
        .sort({ order: 1 })
        .skip(start)
        .limit(PARKS_PER_PAGE)
        .select(
          'parkId order image name city state description activities historicalRelevance npsLink directions',
        );

      const missingCount = PARKS_PER_PAGE - parks.length;

      // If not enough parks in DB, fetch missing ones from NPS
      if (missingCount > 0) {
        const newParks = await this.fetchParksFromNPSApi(start, missingCount);

        if (newParks.length > 0) {
          await Promise.all(
            newParks.map(async (park) => {
              await Park.updateOne(
                { parkId: park.parkId },
                { $set: park },
                { upsert: true },
              );
            }),
          );

          // Fetch updated parks from DB
          parks = await Park.find()
            .sort({ order: 1 })
            .skip(start)
            .limit(PARKS_PER_PAGE)
            .select(
              'parkId order image name city state description activities historicalRelevance npsLink directions',
            );
        }
      }

      return {
        parks,
        pagination: {
          currentPage: page,
          hasMore: parks.length === PARKS_PER_PAGE,
        },
      };
    } catch (error) {
      console.error('Failed to get parks:', error);
      throw new Error('Failed to fetch parks');
    }
  }

  // Fetch and transform parks from NPS API
  async fetchParksFromNPSApi(start, limit) {
    try {
      const { data } = await this.apiClient.get(BASE_URL, {
        params: {
          start,
          limit,
          api_key: this.apiKey,
        },
      });

      if (!data || !data.data) throw new Error('Invalid response from NPS API');

      return data.data.map((park, index) => ({
        parkId: park.id,
        order: start + index,
        image: park.images?.length > 0 ? park.images[0].url : '',
        name: park.fullName,
        city: park.addresses[0]?.city || 'Unknown City',
        state: park.addresses[0]?.stateCode || 'Unknown State',
        description: park.description,
        activities: park.activities.map((a) => a.name).slice(0, 5),
        historicalRelevance: park.topics.map((t) => t.name).slice(0, 5),
        npsLink: `https://www.nps.gov/${park.parkCode}`,
        directions: park.directionsInfo || 'Not available.',
        geolocation: {
          latitude: parseFloat(park.latitude) || null,
          longitude: parseFloat(park.longitude) || null,
        },
      }));
    } catch (error) {
      console.error('Failed to fetch from NPS API:', error);
      return [];
    }
  }
}
