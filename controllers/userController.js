import asyncHandler from 'express-async-handler';
import validator from 'validator';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth user and get token
//@route POST /api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invaild email or password');
  }
});

//@desc add new user
//route POST /api/users
//access public

export const addUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }
  if (!validator.isEmail(email)) {
    res.status(403);
    throw new Error('Need to be an email');
  }
  if (!validator.isStrongPassword(password)) {
    res.status(403);
    throw new Error(
      'The password is not strong: min-length 8, 1 uppercase, 1 lowercase, 1 symbol, 1 number'
    );
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invaild user data');
  }
});

//@desc add new user
//route Delete /api/users
//access Private/ Admin

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@desc Get all users
//@route GET /api/users
//@access private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
