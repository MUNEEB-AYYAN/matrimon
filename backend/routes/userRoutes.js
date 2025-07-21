// routes/userRoutes.js
import express from 'express';
import {
  getAllProfiles,
  getMyProfile,
  shortlistUser,
  getShortlistedUsers,
  getFilteredProfiles,
  getShortlistedProfiles,
  updateMyProfile,
  createProfile,
  reportUser,
} from '../controllers/userController.js';

import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// ✅ Create new profile
router.post('/profile', protect, upload.single('image'), createProfile);

// ✅ Update profile
router.put('/profile', protect, upload.single('image'), updateMyProfile);

// ✅ Get current user's profile
router.get('/profile/me', protect, getMyProfile);

// ✅ Get all user profiles (used in Browse.jsx)
router.get('/profiles', protect, getAllProfiles); // 👈 fixed path

// ✅ Filtered profiles (optional - maybe used with query params)
router.get('/profiles/filtered',protect, getFilteredProfiles);

// ✅ Shortlist routes
router.post('/shortlist/:id', protect, shortlistUser);
router.get('/shortlisted', protect, getShortlistedUsers);
router.get('/shortlisted/profiles', protect, getShortlistedProfiles);

router.post('/report/:id', protect, reportUser);


export default router;
