import express from 'express';
import { getEvents, registerForEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getEvents);

router.route('/:id/register')
  .post(protect, registerForEvent);

export default router;
