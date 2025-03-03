import { serverError } from '../utils/errorResponses.js';

export class ParksController {
  constructor(parksService) {
    this.parksService = parksService;
    this.getParks = this.getParks.bind(this);
  }

  /**
   * Fetches a paginated list of parks
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next function
   */
  async getParks(req, res, next) {
    try {
      // Get page, limit & state from query params, default to 1, 6 and null
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const state = req.query.state || null;

      const result = await this.parksService.getParks(page, limit, state);

      res.locals.parks = result.parks;
      next();
    } catch (err) {
      res.locals.error = serverError('Failed to fetch parks', err.message);
      next();
    }
  }
}
