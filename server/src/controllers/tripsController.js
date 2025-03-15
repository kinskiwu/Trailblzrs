import {
  badRequestError,
  notFoundError,
  serverError,
} from '../utils/errorResponses.js';

export class TripsController {
  constructor(tripsService, parksService, forecastService) {
    this.tripsService = tripsService;
    this.parksService = parksService;
    this.forecastService = forecastService;
    this.createTrip = this.createTrip.bind(this);
    this.getTripById = this.getTripById.bind(this);
  }

  /**
   * Creates a new trip or retrieves an existing one
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  async createTrip(req, res, next) {
    try {
      const { parkSelections } = req.body;

      // Validate input
      if (!Array.isArray(parkSelections) || parkSelections.length < 5) {
        res.locals.error = badRequestError('At least 5 parks are required');
        return next();
      }

      // Get unique dates and all park IDs
      const parkIds = parkSelections.map(({ parkId }) => parkId);
      const parks = await this.parksService.getParksByIds(parkIds);

      // Check for missing parks
      const missingIds = parkIds.filter(
        (id) => !parks.some((p) => p.parkId === id),
      );

      if (missingIds.length > 0) {
        console.error(`Parks not found in DB: ${missingIds}`);
        res.locals.error = serverError(
          'Failed to create trip',
          'Missing parks in database. Ensure all parks are fetched via GET /api/parks first.',
        );
        return next();
      }

      // Build trip details array
      const tripDetails = [];
      const uniqueDates = [...new Set(parkSelections.map((p) => p.visitDate))];

      for (const date of uniqueDates) {
        const parksForDate = parkSelections.filter((p) => p.visitDate === date);
        const parkDetails = [];
        const forecastDetails = [];

        for (const { parkId } of parksForDate) {
          const park = parks.find((p) => p.parkId === parkId);

          // Add park details
          parkDetails.push({
            parkId: park.parkId,
            parkName: park.name,
            state: park.state,
            npsLink: park.npsLink,
            directions: park.directions,
          });

          // Fetch and add forecast
          const forecast = await this.forecastService.getForecastByParkId(
            parkId,
            date,
          );

          forecastDetails.push({
            parkId,
            high: forecast.high,
            low: forecast.low,
            weather: forecast.weather,
            windSpeed: forecast.windSpeed,
          });
        }

        tripDetails.push({
          date,
          parkDetails,
          forecastDetails,
        });
      }

      // Create trip
      const { tripId } = await this.tripsService.createTrip(tripDetails);
      res.locals.tripId = tripId;
      next();
    } catch (err) {
      res.locals.error = serverError('Failed to create trip', err.message);
      next();
    }
  }

  /**
   * Fetches trip details by trip ID
   */
  async getTripById(req, res, next) {
    try {
      const { tripId } = req.params;

      if (!tripId) {
        res.locals.error = badRequestError('Trip ID is required');
        return next();
      }

      const trip = await this.tripsService.getTripById(tripId);

      if (!trip) {
        res.locals.error = notFoundError('Trip');
        return next();
      }

      res.locals.trip = trip;
      next();
    } catch (err) {
      res.locals.error = serverError('Failed to fetch trip', err.message);
      next();
    }
  }
}
