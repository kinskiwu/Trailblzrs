import { Router } from 'express';
import { WeatherController } from '../controllers/weatherController.js';
import { WeatherService } from '../services/weatherService.js';

const weatherRouter = Router();
const weatherService = new WeatherService();
const weatherController = new WeatherController(weatherService);

weatherRouter.get('/', weatherController.getWeather, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }

  return res.status(200).json({
    success: true,
    data: res.locals.weather,
  });
});

export default weatherRouter;
