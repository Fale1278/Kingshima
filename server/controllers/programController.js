import Program from '../models/Program.js';
import UserProgress from '../models/UserProgress.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Fetch all programs
// @route   GET /api/programs
// @access  Private
const getPrograms = asyncHandler(async (req, res) => {
  const programs = await Program.find({});
  res.json(programs);
});

// @desc    Fetch user's started programs with progress
// @route   GET /api/programs/my-programs
// @access  Private
const getMyPrograms = asyncHandler(async (req, res) => {
  const progressEntries = await UserProgress.find({ user: req.user._id })
    .populate('program')
    .sort('-lastAccessed');
  
  res.json(progressEntries);
});

// @desc    Start/Enroll in a program
// @route   POST /api/programs/:id/start
// @access  Private
const startProgram = asyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);

  if (!program) {
    res.status(404);
    throw new Error('Program not found');
  }

  const alreadyStarted = await UserProgress.findOne({
    user: req.user._id,
    program: req.params.id
  });

  if (alreadyStarted) {
    return res.json(alreadyStarted);
  }

  const progress = await UserProgress.create({
    user: req.user._id,
    program: req.params.id,
    progress: 0
  });

  res.status(201).json(progress);
});

// @desc    Update program progress
// @route   PUT /api/programs/:id/progress
// @access  Private
const updateProgress = asyncHandler(async (req, res) => {
  const { progress } = req.body;

  const userProgress = await UserProgress.findOne({
    user: req.user._id,
    program: req.params.id
  });

  if (userProgress) {
    userProgress.progress = progress;
    userProgress.lastAccessed = Date.now();
    userProgress.isCompleted = progress >= 100;

    const updated = await userProgress.save();
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Progress record not found');
  }
});

export {
  getPrograms,
  getMyPrograms,
  startProgram,
  updateProgress
};
