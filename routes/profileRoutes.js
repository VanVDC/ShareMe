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
  deleteEducation,
  updateEducation,
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
router.route('/education').put(protect, updateEducation);
router.route('/education/:edu_id').delete(protect, deleteEducation);

export default router;
