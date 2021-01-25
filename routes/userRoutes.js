import express from 'express';
const router = express.Router();
import {
  authUser,
  addUser,
  deleteUser,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(addUser);
router.post('/login', authUser);
router.route('/:id').delete(protect, deleteUser);

export default router;
