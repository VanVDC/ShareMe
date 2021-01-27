import express from 'express';
const router = express.Router();
import {
  authUser,
  addUser,
  deleteUser,
  getUsers,
  getUserById,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(addUser).get(protect, getUsers);
router.post('/login', authUser);
router.route('/:id').delete(protect, deleteUser).get(protect, getUserById);

export default router;
