// routes/adminRoutes.js
import express from 'express';
import {
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getAllMessages,
  getConversationBetweenUsers
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/users', protect, admin, getAllUsers);
router.put('/block/:id', protect, admin, blockUser);
router.put('/unblock/:id', protect, admin, unblockUser);
router.delete('/delete/:id', protect, admin, deleteUser);

// 👇 NEW route for admin chat monitoring
router.get('/messages', protect, admin, getAllMessages);

router.get('/messages/:user1/:user2', protect, admin, getConversationBetweenUsers);

export default router;
