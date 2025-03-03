import { Router } from 'express';
import { TripsController } from '../controllers/tripsController.js';
import { TripsService } from '../services/tripsService.js';
import { ParksService } from '../services/parksService.js';
import { ForecastService } from '../services/forecastService.js';

// Initialize router and services
const tripsRouter = Router();
const tripsService = new TripsService();
const parksService = new ParksService();
const forecastService = new ForecastService();

// Inject dependencies into controller
const tripsController = new TripsController(
  tripsService,
  parksService,
  forecastService,
);

// POST /api/trips - Create a new trip
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

// GET /api/trips/:tripId - Retrieve a specific trip by ID
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

export default tripsRouter;
