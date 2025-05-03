import express from 'express';
const router = express.Router();
import { getFeed, savePost,sharePost,reportPost } from './../controllers/feed/feedController.js';
import { authenticate } from './../middlewares/authMiddleware.js';

router.get('/', authenticate,getFeed);
router.post('/save', authenticate, savePost);
router.post('/share', authenticate, sharePost);
router.post('/report', authenticate, reportPost);

export default router;
