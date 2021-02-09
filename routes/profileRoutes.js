import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getUserProfileById } from '../controllers/profileController.js';
const router = express.Router();

router.geroutet('/').get(protect, getUserProfileById);

export default router;
