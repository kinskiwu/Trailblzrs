import axios from 'axios';

const BASE_URL = 'https://api.weather.gov/points';

export class WeatherService {
  constructor(apiClient = axios) {
    this.apiClient = apiClient;
    this.headers = {
      'User-Agent': '(national-parks-app, contact@myapp.com)',
      Accept: 'application/json',
    };
  }

  async getWeatherByCoordinates(latitude, longitude) {
    try {
      // Get forecast URL from NWS points endpoint
      const pointsResponse = await this.apiClient.get(
        `${BASE_URL}/${latitude},${longitude}`,
        { headers: this.headers },
      );

      console.log('Points response:', pointsResponse.data);

      // Get the actual forecast using the URL from points response
      const forecastUrl = pointsResponse.data.properties.forecast;
      const forecastResponse = await this.apiClient.get(forecastUrl, {
        headers: this.headers,
      });

      return forecastResponse.data.properties;
    } catch (err) {
      console.error(
        'Failed to fetch weather:',
        err.response?.status,
        err.response?.data || err.message,
      );
      throw new Error('Failed to fetch weather data');
    }
  }
}
