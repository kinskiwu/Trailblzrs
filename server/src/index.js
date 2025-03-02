import express from 'express';
import cors from 'cors';
import parksRouter from './routes/parksRouter.js';
import forecastRouter from './routes/forecastRouter.js';
import tripsRouter from './routes/tripsRouter.js';
import { connectDB } from './config/dbConfig.js';
import { notFoundError } from './utils/errorResponses.js';

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(cors());
app.use(express.json());

app.get('/api/test', (_, res) => {
  res.json({ message: 'Welcome to Trailblzrs API!' });
});

app.use('/api/parks', parksRouter);

app.use('/api/forecast', forecastRouter);

app.use('/api/trips', tripsRouter);

app.use('/api/*', (req, res) => {
  const error = notFoundError('Endpoint');
  error.details = `${req.method} ${req.originalUrl} is not a valid endpoint`;

  res.status(error.status).json({
    success: false,
    message: error.message,
    details: error.details,
  });
});

app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is in use. Trying another port...`);
      app.listen(PORT + 1, () =>
        console.log(`Server running on http://localhost:${PORT + 1}`),
      );
    } else {
      console.error('Server error:', err);
    }
  });
