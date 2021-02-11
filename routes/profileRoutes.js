import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserProfileById,
  createNewProfile,
  getAllProfiles,
  getUserById,
} from '../controllers/profileController.js';
const router = express.Router();

router.route('/').post(protect, createNewProfile).get(getAllProfiles);
router.route('/me').get(protect, getUserProfileById);
router.route('/user/:user_id').get(getUserById);

export default router;
