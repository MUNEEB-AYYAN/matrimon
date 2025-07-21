// controllers/adminController.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Message from '../models/messageModel.js';

// @desc    Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Block user
export const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.isBlocked = true;
  await user.save();

  res.json({ message: `User ${user.email} blocked successfully` });
});

// @desc    Unblock user
export const unblockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.isBlocked = false;
  await user.save();

  res.json({ message: `User ${user.email} unblocked successfully` });
});

// @desc    Delete user (and profile)
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found'); 
  }

  await Profile.deleteOne({ user: user._id });
  await user.deleteOne();

  res.json({ message: `User ${user.email} and their profile deleted` });
});



export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find({}).populate('sender', 'name email').sort({ createdAt: -1 });
  res.json(messages);
});


export const getConversationBetweenUsers = asyncHandler(async (req, res) => {
  const { user1, user2 } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});