import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import { mockAxios, Park } from './setup.js';

let parksRouter;
let ParksService;

beforeAll(async () => {
  const routerModule = await import('../src/routes/parksRouter.js');
  const serviceModule = await import('../src/services/parksService.js');

  parksRouter = routerModule.default;
  ParksService = serviceModule.ParksService;
});

const app = express();
app.use(express.json());

describe('Parks API', () => {
  let axiosMock;

  beforeEach(() => {
    axiosMock = mockAxios();
    app.use('/api/parks', parksRouter);

    if (ParksService) {
      ParksService.prototype.apiClient = axiosMock;
    }

    jest.clearAllMocks();
  });

  test('GET /api/parks returns parks', async () => {
    const mockParks = [
      {
        id: '1',
        fullName: 'Test Park',
        images: [{ url: 'img.jpg' }],
        addresses: [{ city: 'Test City', stateCode: 'TS' }],
        description: 'A test park',
        activities: [{ name: 'Hiking' }],
        topics: [{ name: 'Nature' }],
        parkCode: 'test',
        directionsUrl: 'https://mock-directions.com',
        latitude: '123',
        longitude: '456',
      },
    ];

    axiosMock.get.mockResolvedValue({ data: { data: mockParks } });

    Park.findOneAndUpdate.mockResolvedValue({
      parkId: '1',
      name: 'Test Park',
    });

    const response = await request(app).get('/api/parks?page=1&limit=1');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data.parks)).toBe(true);

    const firstPark = response.body.data.parks[0];
    expect(firstPark).toHaveProperty('parkId');
    expect(firstPark).toHaveProperty('name');
  });

  test('GET /api/parks handles API failure', async () => {
    if (ParksService) {
      ParksService.prototype.getParks = jest.fn().mockImplementation(() => {
        throw new Error('API down');
      });
    }

    const response = await request(app).get('/api/parks');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('Failed to fetch parks');
  });
});
