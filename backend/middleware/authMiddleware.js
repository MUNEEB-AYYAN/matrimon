// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Protect routes for authenticated users
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // 🔍 Check Authorization header first
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 🍪 Or fallback to cookie (e.g., from login)
  else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    console.log('❌ No token provided');
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }
    next();
  } catch (error) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
});

// @desc    Admin-only access
export const admin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access denied');
  }
};
