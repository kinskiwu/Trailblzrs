import { Router } from 'express';
import { ForecastController } from '../controllers/forecastController.js';
import { ForecastService } from '../services/forecastService.js';

const forecastRouter = Router();
const forecastService = new ForecastService();
const forecastController = new ForecastController(forecastService);

// GET /api/weather?parkId=
forecastRouter.get('/', forecastController.getForecast, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }

  return res.status(200).json({
    success: true,
    data: res.locals.forecastData,
  });
});

export default forecastRouter;
