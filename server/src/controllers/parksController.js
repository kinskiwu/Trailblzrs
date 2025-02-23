export class ParksController {
  constructor(parksService) {
    this.parksService = parksService;
  }

  async getParks(req, res, next) {
    try {
      const parks = await this.parksService.fetchParks();
      res.locals.parks = parks;
    } catch (err) {
      res.locals.error = { status: 500, message: 'Failed to fetch parks' };
    }
    return next();
  }
}