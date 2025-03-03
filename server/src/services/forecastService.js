import axios from 'axios';
import { Park } from '../models/parkSchema.js';

const BASE_URL = 'https://api.weather.gov/points';

export class ForecastService {
  constructor(apiClient = axios) {
    this.apiClient = apiClient;
    this.headers = {
      'User-Agent': '(national-parks-app, contact@myapp.com)',
      Accept: 'application/json',
    };
  }

  /**
   * Retrieves the weather forecast for a specific park and date
   * @param {string} parkId - The park's unique identifier
   * @param {string} visitDate - The visit date (YYYY-MM-DD)
   * @returns {Promise<object>} - Forecast data
   */
  async getForecastByParkId(parkId, visitDate) {
    try {
      const park = await Park.findOne({ parkId });

      if (
        !park ||
        !park.geolocation?.latitude ||
        !park.geolocation?.longitude
      ) {
        throw new Error('Park not found or missing geolocation data');
      }

      return await this.getForecastFromNWSApi(
        park.geolocation.latitude,
        park.geolocation.longitude,
        visitDate,
      );
    } catch (err) {
      console.error('Error fetching forecast:', err.message);
      throw new Error('Failed to fetch forecast');
    }
  }

  /**
   * Fetches forecast from National Weather Service API
   */
  async getForecastFromNWSApi(latitude, longitude, visitDate) {
    try {
      const pointsResponse = await this.apiClient.get(
        `${BASE_URL}/${latitude},${longitude}`,
        { headers: this.headers },
      );

      const forecastUrl = pointsResponse.data.properties.forecast;
      const forecastResponse = await this.apiClient.get(forecastUrl, {
        headers: this.headers,
      });

      const periods = forecastResponse.data.properties.periods;
      const visitDay = new Date(visitDate).toISOString().split('T')[0];

      let high, low, weather, windSpeed;

      for (const period of periods) {
        const periodDate = new Date(period.startTime)
          .toISOString()
          .split('T')[0];

        if (periodDate === visitDay) {
          if (period.isDaytime) {
            high = period.temperature;
            weather = period.shortForecast;
            windSpeed = period.windSpeed;
          } else {
            low = period.temperature;
          }
        }
      }

      return { high, low, weather, windSpeed };
    } catch (err) {
      console.error('Failed to fetch forecast:', err.message);
      throw new Error('Failed to fetch forecast data');
    }
  }
}
