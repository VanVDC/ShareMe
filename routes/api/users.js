import express from 'express';
const router = express.Router();

//@route GET api/users
//@desc test route
//@acess Public
router.get('/', (req, res) => res.send('User route'));

export default router;
