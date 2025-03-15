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
        console.log(` Trip ${tripId} not found`);

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

  async updateTrip(req, res, next) {
    try {
      const { tripId } = req.params;
      const { parkId, newDate } = req.body;

      if (!parkId || !newDate) {
        res.locals.error = {
          status: 400,
          message: 'parkId and newDate are required',
        };
        return next();
      }

      const updatedTrip = await this.tripsService.updateTrip(
        tripId,
        parkId,
        newDate,
      );
      if (!updatedTrip) {
        res.locals.error = { status: 404, message: 'Trip not found' };
        return next();
      }

      res.locals.trip = updatedTrip;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to update trip',
        details: err.message,
      };
      next(err);
    }
  }
}
