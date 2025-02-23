import express from 'express';
import cors from 'cors';
import parksRouter from './routes/parksRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (_, res) => {
  res.json({ message: 'Welcome to Trailblzrs API!' });
});

app.use('/api/parks', parksRouter);

const PORT = process.env.PORT || 5001;

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
