export class ParksController {
  constructor(parksService) {
    this.parksService = parksService;
    this.getParks = this.getParks.bind(this);
  }
  async getParks(req, res, next) {
    try {
      // Get page from query params, default to 1
      const page = parseInt(req.query.page) || 1;
      const result = await this.parksService.getParks(page);

      res.locals.parks = result.parks;
      res.locals.pagination = result.pagination;
      next();
    } catch (err) {
      res.locals.error = {
        status: 500,
        message: 'Failed to fetch parks',
        details: err.message
      };
      next(err);
    }
  }
}
