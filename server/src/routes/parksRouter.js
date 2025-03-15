import { Router } from 'express';
import { ParksController } from '../controllers/parksController.js';
import { ParksService } from '../services/parksService.js';

// Initialize router and dependencies
const parksRouter = Router();
const parksService = new ParksService();
const parksController = new ParksController(parksService);

// GET /api/parks?page=1&limit=6 - Retrieve paginated list of parks
parksRouter.get('/', parksController.getParks, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      parks: res.locals.parks,
    },
  });
});

export default parksRouter;
