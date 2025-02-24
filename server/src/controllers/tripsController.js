export class TripsController {
  constructor(tripsService) {
    this.tripsService = tripsService;
    this.createTrip = this.createTrip.bind(this);
    this.getTripById = this.getTripById.bind(this);
  }

  async createTrip(_, res, next) {
    try {
      const newTrip = await this.tripsService.createTrip();

      res.locals.trip = newTrip;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to create trip',
        details: err.message,
      };
      next(err);
    }
  }

  async getTripById(req, res, next) {
    try {
      const { tripId } = req.params;

      const trip = await this.tripsService.getTripById(tripId);

      if (!trip) {
        res.locals.error = {
          status: 404,
          message: 'Trip not found',
        };
        return next();
      }

      res.locals.trip = trip;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to fetch trip',
        details: err.message,
      };
      next(err);
    }
  }
}
