import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getUserProfileById,
  createNewProfile,
  getAllProfiles,
  getUserById,
  deleteProfile,
  updateExperience,
  deleteExperience,
} from '../controllers/profileController.js';
const router = express.Router();

router
  .route('/')
  .post(protect, createNewProfile)
  .get(getAllProfiles)
  .delete(protect, deleteProfile);
router.route('/me').get(protect, getUserProfileById);
router.route('/user/:user_id').get(getUserById);
router.route('/experience').put(protect, updateExperience);
router.route('/experience/:exp_id').delete(protect, deleteExperience);

export default router;
