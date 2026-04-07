import express from 'express';
import { getPosts, createPost, toggleLike } from '../controllers/communityController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getPosts)
  .post(protect, createPost);

router.route('/:id/like')
  .put(protect, toggleLike);

export default router;
