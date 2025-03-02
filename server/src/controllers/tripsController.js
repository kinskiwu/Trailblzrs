import {
  badRequestError,
  notFoundError,
  serverError,
} from '../utils/errorResponses.js';
export class TripsController {
  constructor(tripsService) {
    this.tripsService = tripsService;
    this.createTrip = this.createTrip.bind(this);
    this.getTripById = this.getTripById.bind(this);
    this.updateTrip = this.updateTrip.bind(this);
  }

  async createTrip(_, res, next) {
    try {
      const newTrip = await this.tripsService.createTrip();

      res.locals.trip = newTrip;
      next();
    } catch (err) {
      res.locals.error = serverError('Failed to create trip', err.message);
      next();
    }
  }

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

  async updateTrip(req, res, next) {
    try {
      const { tripId } = req.params;
      const { parkId, newDate } = req.body;

      if (!parkId || !newDate) {
        res.locals.error = badRequestError('parkId and newDate are required');
        return next();
      }

      const updatedTrip = await this.tripsService.updateTrip(
        tripId,
        parkId,
        newDate,
      );

      if (!updatedTrip) {
        res.locals.error = notFoundError('Trip');
        return next();
      }

      res.locals.trip = updatedTrip;
      next();
    } catch (err) {
      res.locals.error = serverError('Failed to update trip', err.message);
      next();
    }
  }
}
