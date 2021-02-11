import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserProfileById,
  createNewProfile,
} from '../controllers/profileController.js';
const router = express.Router();

router.route('/').post(protect, createNewProfile);
router.route('/me').get(protect, getUserProfileById);

export default router;
