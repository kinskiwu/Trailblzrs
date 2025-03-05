import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import { notFoundError } from '../src/utils/errorResponses.js';

// Create app
const app = express();
app.use(express.json());

describe('API Infrastructure', () => {
  beforeEach(() => {
    // Setup routes for each test
    app.get('/api/test', (_, res) => {
      res.json({ message: 'Welcome to Trailblzrs API!' });
    });

    app.use('/api/*', (req, res) => {
      const error = notFoundError('Endpoint');
      error.details = `${req.method} ${req.originalUrl} is not a valid endpoint`;

      res.status(error.status).json({
        success: false,
        message: error.message,
        details: error.details,
      });
    });

    jest.clearAllMocks();
  });

  test('GET /api/test returns welcome message', async () => {
    const response = await request(app).get('/api/test');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Welcome to Trailblzrs API!');
  });

  test('GET /api/nonexistent returns 404', async () => {
    const response = await request(app).get('/api/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toContain('not found');
    expect(response.body.details).toContain('GET /api/nonexistent');
  });

  test('POST /api/nonexistent returns 404 with correct method', async () => {
    const response = await request(app).post('/api/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.details).toContain('POST /api/nonexistent');
  });
});
