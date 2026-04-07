import express from 'express';
import { 
  getPrograms, 
  getMyPrograms, 
  startProgram, 
  updateProgress 
} from '../controllers/programController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getPrograms);

router.route('/my-programs')
  .get(protect, getMyPrograms);

router.route('/:id/start')
  .post(protect, startProgram);

router.route('/:id/progress')
  .put(protect, updateProgress);

export default router;
