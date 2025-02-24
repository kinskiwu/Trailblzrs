import { Park } from '../models/parkSchema.js';

export class WeatherController {
  constructor(weatherService) {
    this.weatherService = weatherService;
    this.getWeather = this.getWeather.bind(this);
  }

  async getWeather(req, res, next) {
    try {
      const { parkId, startDate } = req.query;

      if (!parkId) {
        throw new Error('Park ID is required');
      }

      // Fetch park details from the database
      const park = await Park.findOne({ parkId });

      if (
        !park ||
        !park.geolocation?.latitude ||
        !park.geolocation?.longitude
      ) {
        throw new Error('Park not found or missing geolocation data');
      }

      // Fetch weather using geolocation
      const forecast = await this.weatherService.getWeatherByCoordinates(
        park.geolocation.latitude,
        park.geolocation.longitude,
        startDate,
      );

      res.locals.weather = {
        parkId: park.parkId,
        parkName: park.name,
        forecast,
      };
      next();
    } catch (err) {
      res.locals.error = {
        status: err.message.includes('required') ? 400 : 404,
        message: err.message,
        details: err.response?.data || err.message,
      };
      next(err);
    }
  }
}
