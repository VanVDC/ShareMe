import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';

//@route GET api/profile/me
//@desc Get current users profile
//@acess Public
export const getUserProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findById(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404);
    throw new Error('profile not found');
  }
});
