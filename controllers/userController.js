import asyncHandler from 'express-async-handler';
import validator from 'validator';

//@desc Auth user and get token
//@route POST /api/users/login
//@access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  res.json({
    email,
    password,
  });
});
