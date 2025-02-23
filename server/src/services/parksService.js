import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NPS_API_URL = 'https://developer.nps.gov/api/v1/parks';

export class ParksService {
  constructor(apiClient = axios, apiKey = process.env.NPS_API_KEY) {
    this.apiClient = apiClient;
    this.apiKey = apiKey;
  }

  async fetchParks(limit = 5) {
    try {
      const { data } = await this.apiClient.get(NPS_API_URL, {
        params: { limit, api_key: this.apiKey },
      });

      return data.data.slice(0, limit).map((park, index) => ({
        order: index + 1,
        name: park.fullName,
        state: park.states,
        npsLink: park.url,
        entranceFee: park.entranceFees.length
          ? `$${park.entranceFees[0].cost}`
          : 'Free',
        location: `${park.addresses[0]?.city}, ${park.addresses[0]?.stateCode}`,
        activities: park.activities.map((a) => a.name).join(', '),
        historicalRelevance: park.topics.map((t) => t.name).join(', '),
        directions: park.directionsUrl,
      }));
    } catch (err) {
      console.error('Failed to fetch parks');
    }
  }
}
