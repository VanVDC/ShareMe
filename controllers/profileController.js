import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';
import validator from 'validator';

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
//@route POST api/profile
//@desc create or update user profile
//@acess private
export const createNewProfile = asyncHandler(async (req, res) => {
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin,
  } = req.body;

  //check
  if (validator.isEmpty(skills)) {
    res.status(403);
    throw new Error('Skill is required');
  }
  if (validator.isEmpty(status)) {
    res.status(403);
    throw new Error('Status is required');
  }

  //build profile object
  const profileFields = {};
  profileFields.use = req.user.id;
  if (company) profileFields.comapny = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    profileFields.skills = skills.split(',').map((skill) => skill.trim());
  }
  //build social object

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    //create
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
