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
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route GET /api/posts
//@desc Get all posts
//@access Private

export const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route GET /api/posts/:id
//@desc Get post by id
//@access Private

export const getPostById = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route DELETE /api/posts/:id
//@desc Delete a post by id
//@access Private

export const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    //check on the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route PUT /api/posts/like:id
//@desc Like a post by id
//@access Private

export const likeAPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check on the user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(404).json({ msg: 'Already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route PUT /api/posts/unlike:id
//@desc unLike a post by id
//@access Private

export const unlikeAPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check on the user already liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(404).json({ msg: 'Post has not yet been liked' });
    }
    //get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route POST /api/posts/comment/:id
//@desc Comment on a post
//@access Private

export const commentOnAPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (validator.isEmpty(text)) {
    res.status(400);
    throw new Error('Text is required');
  }
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    //check on the user already liked the post

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
