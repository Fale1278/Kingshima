import { Achievement, UserAchievement } from '../models/Achievement.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all possible achievements
// @route   GET /api/achievements
// @access  Private
const getAchievements = asyncHandler(async (req, res) => {
  const allAchievements = await Achievement.find({});
  const unlocked = await UserAchievement.find({ user: req.user._id }).select('achievement');
  const unlockedIds = unlocked.map(un => un.achievement.toString());

  const merged = allAchievements.map(ac => ({
    ...ac._doc,
    isLocked: !unlockedIds.includes(ac._id.toString())
  }));

  res.json(merged);
});

export { getAchievements };
