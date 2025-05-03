import express from 'express';
import { getUserProfile } from '../controllers/user/userController.js';

import { authenticate } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticate, getUserProfile);


export default router;
