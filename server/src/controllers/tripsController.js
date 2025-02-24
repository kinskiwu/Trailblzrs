export class TripsController {
  constructor(tripsService) {
    this.tripsService = tripsService;
    this.createTrip = this.createTrip.bind(this);
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
}
