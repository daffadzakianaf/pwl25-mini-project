import express from 'express';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(logger);
app.use('/auth', authRoutes);

app.use('/movies', verifyToken, movieRoutes);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to Movies API 🎬');
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
