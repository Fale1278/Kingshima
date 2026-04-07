import Post from '../models/Post.js';

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// @desc    Get all community posts
// @route   GET /api/community
// @access  Private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({})
    .populate('user', 'name')
    .populate('comments.user', 'name')
    .sort('-createdAt');
  
  res.json(posts);
});

// @desc    Create a new community post
// @route   POST /api/community
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error('Please provide text for the post');
  }

  const post = await Post.create({
    user: req.user._id,
    text
  });

  const populatedPost = await post.populate('user', 'name');
  res.status(201).json(populatedPost);
});

// @desc    Like/Unlike a post
// @route   PUT /api/community/:id/like
// @access  Private
const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    const isLiked = post.likes.includes(req.user._id);
    
    if (isLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export { getPosts, createPost, toggleLike };
