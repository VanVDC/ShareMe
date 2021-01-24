import express from 'express';
const router = express.Router();
import { authUser, addUser } from '../controllers/userController.js';
router.route('/').post(addUser);
router.post('/login', authUser);

export default router;
