// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    age: Number,
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    location: String,
    religion: String,
    avatar: String,
    likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    password: { type: String, required: true },
    shortlisted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },

    verifyToken: { type: String },
    isVerified: { type: Boolean, default: false },

    reportedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
