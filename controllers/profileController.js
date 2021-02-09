import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';
import User from '../models/User.js';

//@route GET api/profile/me
//@desc Get current users profile
//@acess Public
export const getUserProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name', 'avatar']
  );
  if (profile) {
    res.json(profile);
  } else {
    res.status(400);
    throw new Error('profile not found');
  }
});
