import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';
import validator from 'validator';
import request from 'request';
import User from '../models/User.js';
import { response } from 'express';

//@route GET api/profile/me
//@desc Get current users profile
//@acess private
export const getUserProfileById = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).json({ meg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
  profileFields.user = req.user.id;
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

//@route GET api/profile
//@desc get all profiles
//@acess public

export const getAllProfiles = asyncHandler(async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route GET api/profile/user/:user_id
//@desc get profile by user ID
//@acess public

export const getUserById = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route DELETE api/profile
//@desc delete profile, user, and post
//@acess private

export const deleteProfile = asyncHandler(async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    });

    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: 'User/Profile is removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route PUT api/profile/experience
//@desc Add profile experience
//@acess private

export const updateExperience = asyncHandler(async (req, res) => {
  const { title, company, from, to, current, description, location } = req.body;
  //check
  if (validator.isEmpty(title)) {
    res.status(403);
    throw new Error('Title is required');
  }
  if (validator.isEmpty(company)) {
    res.status(403);
    throw new Error('Company is required');
  }
  if (validator.isEmpty(from)) {
    res.status(403);
    throw new Error('From date is required');
  }

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route DELETE api/profile/experience/:id
//@desc delete profile experience
//@acess private

export const deleteExperience = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index

    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    await profile.save();
    profile.experience.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route PUT api/profile/education
//@desc Add profile education
//@acess private

export const updateEducation = asyncHandler(async (req, res) => {
  const {
    school,
    degree,
    from,
    fieldofstudy,
    to,
    current,
    description,
  } = req.body;
  //check
  if (validator.isEmpty(school)) {
    res.status(403);
    throw new Error('School is required');
  }
  if (validator.isEmpty(degree)) {
    res.status(403);
    throw new Error('Degree is required');
  }
  if (validator.isEmpty(fieldofstudy)) {
    res.status(403);
    throw new Error('Field of study is required');
  }
  if (validator.isEmpty(from)) {
    res.status(403);
    throw new Error('From date is required');
  }

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route DELETE api/profile/education/:edu_id
//@desc delete profile education
//@acess private

export const deleteEducation = asyncHandler(async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //get remove index

    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    await profile.save();
    profile.education.splice(removeIndex, 1);
    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@route GET api/profile/github/:username
//@desc get user repos from Github
//@acess public

export const getUserGithub = asyncHandler(async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.githubClientId}&client_secret${process.env.githubSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
