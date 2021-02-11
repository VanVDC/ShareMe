import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  likeAPost,
  unlikeAPost,
} from '../controllers/postController.js';
const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getAllPosts);
router.route('/:id').get(protect, getPostById).delete(protect, deletePost);
router.route('/like/:id').put(protect, likeAPost);
router.route('/unlike/:id').put(protect, unlikeAPost);
export default router;
