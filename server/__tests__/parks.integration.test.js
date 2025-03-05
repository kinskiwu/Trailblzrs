import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import { mockAxios } from './setup.js';

let parksRouter;
let ParksService;

beforeAll(async () => {
  const routerModule = await import('../src/routes/parksRouter.js');
  const serviceModule = await import('../src/services/parksService.js');

  parksRouter = routerModule.default;
  ParksService = serviceModule.ParksService;
});

// Create app
const app = express();
app.use(express.json());

describe('Parks API', () => {
  let axiosMock;

  beforeEach(() => {
    // Setup router
    app.use('/api/parks', parksRouter);

    // Setup mocks
    axiosMock = mockAxios();
    ParksService.prototype.apiClient = axiosMock;

    jest.clearAllMocks();
  });

  test('GET /api/parks returns parks', async () => {
    // Setup mock data
    axiosMock.get.mockResolvedValue({
      data: {
        data: [
          {
            id: '1',
            fullName: 'Mock Park',
            images: [{ url: 'img.jpg' }],
            addresses: [{ stateCode: 'TS' }],
          },
        ],
      },
    });

    const response = await request(app).get('/api/parks');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.parks)).toBe(true);
  });

  test('GET /api/parks handles API failure', async () => {
    ParksService.prototype.getParks = jest
      .fn()
      .mockRejectedValue(new Error('API down'));

    const response = await request(app).get('/api/parks');
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
  });
});
