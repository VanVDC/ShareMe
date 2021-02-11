import asyncHandler from 'express-async-handler';
import validator from 'validator';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Profile from '../models/Profile.js';

//@route POST /api/posts
//@desc create a post
//@access Private

export const createPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (validator.isEmpty(text)) {
    res.status(400);
    throw new Error('Text is required');
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
