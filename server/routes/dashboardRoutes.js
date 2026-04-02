import express from 'express';
import { getDashboardStats, getGrowthData, getAnnouncements } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getDashboardStats);
router.get('/growth', protect, getGrowthData);
router.get('/announcements', protect, getAnnouncements);

export default router;
