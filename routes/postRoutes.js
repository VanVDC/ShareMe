import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPost,
  getAllPosts,
  getPostById,
} from '../controllers/postController.js';
const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getAllPosts);
router.route('/:id').post(protect, getPostById);
export default router;
