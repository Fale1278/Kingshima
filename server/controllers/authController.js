import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle,
      location: user.location,
      website: user.website,
      bio: user.bio,
      skills: user.skills,
      goals: user.goals,
      interests: user.interests,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle,
      location: user.location,
      website: user.website,
      bio: user.bio,
      skills: user.skills,
      goals: user.goals,
      interests: user.interests,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      jobTitle: user.jobTitle,
      location: user.location,
      website: user.website,
      bio: user.bio,
      skills: user.skills,
      goals: user.goals,
      interests: user.interests,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.jobTitle = req.body.jobTitle !== undefined ? req.body.jobTitle : user.jobTitle;
    user.location = req.body.location !== undefined ? req.body.location : user.location;
    user.website = req.body.website !== undefined ? req.body.website : user.website;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.skills = req.body.skills || user.skills;
    user.goals = req.body.goals || user.goals;
    user.interests = req.body.interests || user.interests;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      jobTitle: updatedUser.jobTitle,
      location: updatedUser.location,
      website: updatedUser.website,
      bio: updatedUser.bio,
      skills: updatedUser.skills,
      goals: updatedUser.goals,
      interests: updatedUser.interests,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { registerUser, authUser, getUserProfile, updateUserProfile };
