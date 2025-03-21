import { badRequestError, serverError } from '../utils/errorResponses.js';

export class ForecastController {
  constructor(forecastService) {
    this.forecastService = forecastService;
    this.getForecast = this.getForecast.bind(this);
  }

  /**
   * Fetches the weather forecast for a given park and date
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  async getForecast(req, res, next) {
    try {
      const { parkId, visitDate } = req.query;

      if (!parkId || !visitDate) {
        res.locals.error = badRequestError(
          'Both parkId and visitDate are required',
        );
        return next();
      }

      const forecast = await this.forecastService.getForecastByParkId(
        parkId,
        visitDate,
      );

      res.locals.forecastData = forecast;
      next();
    } catch (err) {
      res.locals.error = serverError(
        'Failed to fetch forecast data',
        err.message,
      );
      next();
    }
  }
}
