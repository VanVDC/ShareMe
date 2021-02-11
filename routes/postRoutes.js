import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createPost } from '../controllers/postController.js';
const router = express.Router();

router.route('/').post(protect, createPost);

export default router;
