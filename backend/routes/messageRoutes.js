// routes/messageRoutes.js
import express from 'express';
import {
  sendMessage,
  getMessages,
  getMessagePairs, // ✅ added import
} from '../controllers/messageController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:userId').get(protect, getMessages);
router.route('/pairs').get(protect, admin, getMessagePairs); // ✅ added admin monitoring route

export default router;
