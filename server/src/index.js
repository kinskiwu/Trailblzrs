import express from 'express';
import cors from 'cors';
import parksRouter from './routes/parksRouter.js';
import forecastRouter from './routes/forecastRouter.js';
import tripsRouter from './routes/tripsRouter.js';
import { connectDB } from './config/dbConfig.js';
import { notFoundError } from './utils/errorResponses.js';

// Setup Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/test', (_, res) => {
  res.json({ message: 'Welcome to Trailblzrs API!' });
});

// API routes
app.use('/api/parks', parksRouter);
app.use('/api/forecast', forecastRouter);
app.use('/api/trips', tripsRouter);

// 404 handler route
app.use('/api/*', (req, res) => {
  const error = notFoundError('Endpoint');
  error.details = `${req.method} ${req.originalUrl} is not a valid endpoint`;

  res.status(error.status).json({
    success: false,
    message: error.message,
    details: error.details,
  });
});

/**
 * Starts server after connecting to database
 * @returns {http.Server} HTTP server instance
 */
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      console.error('Server error:', err.message);
      process.exit(1);
    });

    return server;
  } catch (err) {
    console.error('Failed to start:', err.message);
    process.exit(1);
  }
};

// Initialize app
startServer();
