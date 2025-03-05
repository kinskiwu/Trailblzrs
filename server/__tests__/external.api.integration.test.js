import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import { mockAxios } from './setup.js';

let parksRouter;
let ParksService;
let forecastRouter;
let ForecastService;
let Park;
let originalConsoleError;

beforeAll(async () => {
  const parksRouterModule = await import('../src/routes/parksRouter.js');
  const parksServiceModule = await import('../src/services/parksService.js');
  const forecastRouterModule = await import('../src/routes/forecastRouter.js');
  const forecastServiceModule = await import(
    '../src/services/forecastService.js'
  );
  const setupModule = await import('./setup.js');

  parksRouter = parksRouterModule.default;
  ParksService = parksServiceModule.ParksService;
  forecastRouter = forecastRouterModule.default;
  ForecastService = forecastServiceModule.ForecastService;
  Park = setupModule.Park;

  // Store original console.error
  originalConsoleError = console.error;
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Create app
const app = express();
app.use(express.json());

describe('External API Resilience', () => {
  beforeEach(() => {
    console.error = jest.fn();

    app._router.stack = app._router.stack.filter(
      (layer) => layer.name !== 'router',
    );

    jest.clearAllMocks();
  });

  describe('Parks API', () => {
    beforeEach(() => {
      app.use('/api/parks', parksRouter);
    });

    test('handles generic API error', async () => {
      ParksService.prototype.getParks = jest.fn().mockImplementation(() => {
        throw new Error('API Error');
      });

      const response = await request(app).get('/api/parks');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Failed to fetch parks');
    });

    test('handles timeout error', async () => {
      ParksService.prototype.getParks = jest.fn().mockImplementation(() => {
        const error = new Error('Request timed out');
        error.code = 'ETIMEDOUT';
        throw error;
      });

      const response = await request(app).get('/api/parks');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    test('handles network error', async () => {
      ParksService.prototype.getParks = jest.fn().mockImplementation(() => {
        const error = new Error('Network Error');
        error.code = 'ENOTFOUND';
        throw error;
      });

      const response = await request(app).get('/api/parks');

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Forecast API', () => {
    beforeEach(() => {
      app.use('/api/forecast', forecastRouter);

      Park.findOne.mockResolvedValue({
        parkId: 'test-park',
        geolocation: {
          latitude: 35.6,
          longitude: -120.7,
        },
      });
    });

    test('handles missing required parameters', async () => {
      const response = await request(app).get('/api/forecast');

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('required');
    });

    test('handles NWS API error', async () => {
      ForecastService.prototype.getForecastFromNWSApi = jest
        .fn()
        .mockImplementation(() => {
          throw new Error('NWS API Error');
        });

      const response = await request(app).get(
        '/api/forecast?parkId=test-park&visitDate=2025-05-01',
      );

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Failed to fetch forecast data');
    });

    test('handles missing park error', async () => {
      Park.findOne.mockResolvedValue(null);

      const response = await request(app).get(
        '/api/forecast?parkId=nonexistent&visitDate=2025-05-01',
      );

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });
});
