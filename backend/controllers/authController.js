// // controllers/authController.js
// import asyncHandler from 'express-async-handler';
// import User from '../models/userModel.js';
// import bcrypt from 'bcryptjs';
// import { generateToken } from '../utils/generateToken.js';

// // @desc    Register user
// export const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password, phone, age, gender, image } = req.body;

//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   // ✅ Hash password here
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     phone,
//     age,
//     gender,
//     avatar: image,
//     password: hashedPassword,
//   });

//   if (user) {
//     generateToken(res, user._id);
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       age: user.age,
//       gender: user.gender,
//       avatar: user.avatar,
//       isAdmin: user.isAdmin,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// // @desc    Login user
// export const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   // ✅ Check password using bcrypt
//   const isPasswordValid = user && (await bcrypt.compare(password, user.password));

//   if (!isPasswordValid) {
//     res.status(401);
//     throw new Error('Invalid email or password');
//   }

//   generateToken(res, user._id);

//   res.status(200).json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,
//     isAdmin: user.isAdmin,
//   });
// });

// // @desc    Logout user
// export const logoutUser = asyncHandler(async (req, res) => {
//   res.cookie('jwt');
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// // @desc    Get current logged-in user
// export const getCurrentUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.status(200).json(user);
// });


// controllers/authController.js

import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, age, gender, image } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    phone,
    age,
    gender,
    avatar: image || null,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // Generate JWT token and set it in cookie
  const token = generateToken(res, newUser._id);

  res.status(201).json({
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      age: newUser.age,
      gender: newUser.gender,
      avatar: newUser.avatar,
      role: newUser.role, // assumed role: 'user' or 'admin'
    },
    token,
  });
});


export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ verifyToken: token });
  if (!user) throw new Error('Invalid or expired token');

  user.isVerified = true;
  user.verifyToken = undefined;
  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
});


// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = generateToken(res, user._id);

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      avatar: user.avatar,
      role: user.role, // assumed role: 'user' or 'admin'
    },
    token,
  });
});
// @desc    Logout user (clear cookie)
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get current logged-in user
// @route   GET /api/users/profile/me
// @access  Private
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});
