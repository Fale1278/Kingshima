import Event from '../models/Event.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort('date');
  res.json(events);
});

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
const registerForEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.registeredUsers.includes(req.user._id)) {
      res.status(400);
      throw new Error('Already registered');
    }
    
    event.registeredUsers.push(req.user._id);
    await event.save();
    res.json({ message: 'Successfully registered for event' });
  } else {
    res.status(404);
    throw new Error('Event not found');
  }
});

export { getEvents, registerForEvent };
