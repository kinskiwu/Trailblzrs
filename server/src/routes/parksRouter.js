import { Router } from 'express';
import { ParksController } from '../controllers/parksController';
import { ParksService } from '../services/parksService';

const parksRouter = Router();
const parksService = new ParksService();
const parksController = new ParksController(parksService);

parksRouter.get('/', async (req, res) => {
  try {
    const parks = await parksController.getParks();
    res.status(200).json({ success: true, data: parks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch parks' });
  }
});

export default parksRouter;
