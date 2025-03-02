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
   * @returns {Promise<object|null>} - Forecast data or `null` if park not found
   */
  async getForecastByParkId(parkId, visitDate) {
    try {
      // Fetch park details from DB
      const park = await Park.findOne({ parkId });

      if (
        !park ||
        !park.geolocation?.latitude ||
        !park.geolocation?.longitude
      ) {
        throw new Error('Park not found or missing geolocation data');
      }

      // Fetch forecast using geolocation
      const forecast = await this.getForecastFromNWSApi(
        park.geolocation.latitude,
        park.geolocation.longitude,
        visitDate,
      );

      return {
        parkId: park.parkId,
        visitDate,
        high: forecast.high,
        low: forecast.low,
        weather: forecast.weather,
        windSpeed: forecast.windSpeed,
      };
    } catch (err) {
      console.error('Error fetching park or forecast data:', err.message);
      throw new Error('Failed to fetch park and forecast data');
    }
  }

  /**
   * Calls the NWS API to fetch weather data based on latitude/longitude
   * @param {number} latitude - Park's latitude
   * @param {number} longitude - Park's longitude
   * @param {string} visitDate - The visit date (YYYY-MM-DD)
   * @returns {Promise<object>} - Forecast details including temperature, wind speed, and conditions
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

      // Initialize forecast variables
      let high = undefined;
      let low = undefined;
      let weather = undefined;
      let windSpeed = undefined;

      // Loop through periods and extract relevant data
      for (const period of periods) {
        const periodDate = new Date(period.startTime)
          .toISOString()
          .split('T')[0];

        if (periodDate === visitDay) {
          if (period.isDaytime && high === undefined) {
            high = period.temperature;
            windSpeed = period.windSpeed;
            weather = period.shortForecast;
          } else if (!period.isDaytime && low === undefined) {
            low = period.temperature;
          }

          // Stop early if both high and low are found
          if (high !== undefined && low !== undefined) {
            break;
          }
        }
      }

      // Return extracted data or empty object if no data found
      return high !== undefined || low !== undefined
        ? { high, low, weather, windSpeed }
        : {};
    } catch (err) {
      console.error('Failed to fetch forecast:', err.message);
      throw new Error('Failed to fetch forecast data');
    }
  }
}
