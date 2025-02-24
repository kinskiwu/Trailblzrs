import { Router } from 'express';
import { TripsController } from '../controllers/tripsController.js';
import { TripsService } from '../services/tripsService.js';

const tripsRouter = Router();
const tripsService = new TripsService();
const tripsController = new TripsController(tripsService);

// POST /api/trips
tripsRouter.post('/', tripsController.createTrip, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }
  return res.status(201).json({ success: true, data: res.locals.trip });
});

// GET /api/trips/:tripId
tripsRouter.get('/:tripId', tripsController.getTripById, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }
  return res.status(200).json({ success: true, data: res.locals.trip });
});

// PUT /api/trips/:tripId
tripsRouter.put('/:tripId', tripsController.updateTrip, (_, res) => {
  if (res.locals.error) {
    return res.status(res.locals.error.status).json({
      success: false,
      message: res.locals.error.message,
      details: res.locals.error.details,
    });
  }
  return res.status(200).json({ success: true, data: res.locals.trip });
});

export default tripsRouter;
