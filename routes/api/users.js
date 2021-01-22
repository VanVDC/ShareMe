import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator/check';

//@route POST api/users
//@desc test route
//@acess Public
router
  .route('/')
  .get(
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email ').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters '
      ).isLength({ min: 6 }),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      res.send('User route');
    }
  );

export default router;
