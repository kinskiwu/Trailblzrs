import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

let tripsRouter;
let TripsService;
let ParksService;
let ForecastService;

beforeAll(async () => {
  const routerModule = await import('../src/routes/tripsRouter.js');
  const tripsServiceModule = await import('../src/services/tripsService.js');
  const parksServiceModule = await import('../src/services/parksService.js');
  const forecastServiceModule = await import(
    '../src/services/forecastService.js'
  );

  tripsRouter = routerModule.default;
  TripsService = tripsServiceModule.TripsService;
  ParksService = parksServiceModule.ParksService;
  ForecastService = forecastServiceModule.ForecastService;
});

// Create app
const app = express();
app.use(express.json());

describe('Trips API', () => {
  beforeEach(() => {
    app.use('/api/trips', tripsRouter);
    jest.clearAllMocks();
  });

  test('POST /api/trips creates a new trip', async () => {
    const parkSelections = Array(5)
      .fill()
      .map((_, i) => ({
        parkId: `park-${i}`,
        visitDate: '2025-04-15',
      }));

    ParksService.prototype.getParksByIds = jest.fn().mockResolvedValue(
      parkSelections.map((selection) => ({
        parkId: selection.parkId,
        name: `Mock Park ${selection.parkId}`,
        state: 'CA',
        npsLink: `https://mock.com/${selection.parkId}`,
        directions: `https://mock.com/${selection.parkId}/directions`,
        geolocation: { latitude: 35, longitude: -120 },
      })),
    );

    ForecastService.prototype.getForecastByParkId = jest
      .fn()
      .mockResolvedValue({
        high: 75,
        low: 50,
        weather: 'Sunny',
        windSpeed: '5 mph',
      });

    TripsService.prototype.createTrip = jest.fn().mockResolvedValue({
      tripId: 'test-trip-id',
      tripDetails: [],
    });

    const response = await request(app)
      .post('/api/trips')
      .send({ parkSelections });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('POST /api/trips validates input', async () => {
    const response = await request(app)
      .post('/api/trips')
      .send({
        parkSelections: [{ parkId: 'park-1', visitDate: '2025-04-15' }],
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('GET /api/trips/:tripId returns a trip', async () => {
    TripsService.prototype.getTripById = jest.fn().mockResolvedValue({
      tripId: 'test-trip-id',
      tripDetails: [],
    });

    const response = await request(app).get('/api/trips/test-trip-id');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('GET /api/trips/:tripId returns 404 for missing trip', async () => {
    TripsService.prototype.getTripById = jest.fn().mockResolvedValue(null);

    const response = await request(app).get('/api/trips/missing');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});
