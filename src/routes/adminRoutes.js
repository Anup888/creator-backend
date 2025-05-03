import express from 'express';
import { getUserAnalytics,getAllUsers, updateUserCredit } from '../controllers/admin/adminController.js';
import { authenticate, authorize } from './../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/users', authenticate, authorize('ADMIN'), getAllUsers);
router.post('/update-credit', authenticate, authorize('ADMIN'), updateUserCredit);
router.get('/analytics',authenticate,authorize('ADMIN'), getUserAnalytics);

export default router;
