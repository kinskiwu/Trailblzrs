export class ForecastController {
  constructor(forecastService) {
    this.forecastService = forecastService;
    this.getForecast = this.getForecast.bind(this);
  }

  async getForecast(req, res, next) {
    try {
      const { parkId, visitDate } = req.query;

      if (!parkId || !visitDate) {
        throw new Error('Both parkId and visitDate are required');
      }

      const forecast = await this.forecastService.getForecastByParkId(
        parkId,
        visitDate,
      );

      res.locals.forecastData = forecast;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to fetch forecast data',
        details: err.message,
      };
      next();
    }
  }
}
