export class ParksController {
  constructor(parksService) {
    this.parksService = parksService;
    this.getParks = this.getParks.bind(this);
  }

  async getParks(_, res, next) {
    try {
      const parks = await this.parksService.fetchParks();
      res.locals.parks = parks;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to fetch parks',
        details: err.message,
      };
      next(err);
    }
  }
}
