import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Route imports
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import programRoutes from './routes/programRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import mentorRoutes from './routes/mentorRoutes.js';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Debugging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.body && req.body.password) {
    const dummyBody = { ...req.body, password: '***' };
    console.log('Body:', dummyBody);
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/mentor', mentorRoutes);

app.get('/', (req, res) => {
  res.send('Kingshima API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('WARNING: MONGO_URI is not defined in .env');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  connectDB();
});
