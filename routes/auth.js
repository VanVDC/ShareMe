import express from 'express';
const router = express.Router();

//@route GET api/auth
//@desc test route
//@acess Private
router.get('/', (req, res) => res.send('Profile route'));

export default router;
