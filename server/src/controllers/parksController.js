export class ParksController {
  constructor(parksService) {
    this.parksService = parksService;
    this.getParks = this.getParks.bind(this);
  }
  async getParks(req, res, next) {
    try {
      // Get page and limit from query params, default to 1 and 6
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;

      const result = await this.parksService.getParks(page, limit);

      res.locals.parks = result.parks;
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
