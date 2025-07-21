// controllers/messageController.js
import asyncHandler from 'express-async-handler';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, content } = req.body;

  const message = await Message.create({
    sender: req.user._id,
    receiver: receiverId,
    content,
  });



  if (
  sender.reportedUsers.includes(receiverId) ||
  sender.blockedUsers.includes(receiverId)
) {
  res.status(403);
  throw new Error("You cannot message this user.");
}


  res.status(201).json(message);
});

// @desc    Get all messages between two users
// @route   GET /api/messages/:userId
// @access  Private
export const getMessages = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  }).sort({ createdAt: 1 });

  res.json(messages);
});


export const getMessagePairs = asyncHandler(async (req, res) => {
  const messages = await Message.find();

  const uniquePairs = new Set();

  const pairs = [];

  for (const msg of messages) {
    const ids = [msg.sender, msg.receiver].sort();
    const key = `${ids[0]}-${ids[1]}`;

    if (!uniquePairs.has(key)) {
      uniquePairs.add(key);

      const user1 = await User.findById(ids[0]);
      const user2 = await User.findById(ids[1]);

      pairs.push({
        user1: user1._id,
        user2: user2._id,
        user1Name: user1.name,
        user2Name: user2.name,
      });
    }
  }

  res.json(pairs);
});
