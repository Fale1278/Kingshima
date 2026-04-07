import express from 'express';
import { applyAsMentor } from '../controllers/mentorController.js';

const router = express.Router();

router.post('/apply', applyAsMentor);

export default router;
