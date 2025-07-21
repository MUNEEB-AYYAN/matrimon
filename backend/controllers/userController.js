// controllers/userController.js
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';

// @desc    Create or update user profile
// @route   POST /api/users/profile
// @access  Private
// controllers/userController.js
export const createOrUpdateProfile = asyncHandler(async (req, res) => {
  try {
    const existing = await Profile.findOne({ user: req.user._id });

    const profileData = {
      user: req.user._id,
      age: req.body.age,
      gender: req.body.gender,
      religion: req.body.religion,
      caste: req.body.caste,
      location: req.body.location,
      about: req.body.about,
      image: req.body.image || null,
    };

    let profile;

    if (existing) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        profileData,
        { new: true }
      );
    } else {
      profile = new Profile(profileData);
      await profile.save();
    }

    res.status(201).json(profile);
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ message: err.message });
  }
});


// @desc    Get logged-in user's profile
// @route   GET /api/users/profile/me
// @access  Private
export const getMyProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.json(req.user);
});

export const reportUser = asyncHandler(async (req, res) => {
  const userIdToReport = req.params.id;
  const currentUserId = req.user._id;

  if (userIdToReport === currentUserId.toString()) {
    res.status(400);
    throw new Error("You cannot report yourself.");
  }

  const user = await User.findById(currentUserId);

  if (user.reportedUsers.includes(userIdToReport)) {
    res.status(400);
    throw new Error("User already reported.");
  }

  user.reportedUsers.push(userIdToReport);
  await user.save();

  res.status(200).json({ message: "User reported successfully." });
});

// @desc    Get all profiles (for public browsing)
// @route   GET /api/users/profiles
// @access  Public
export const getAllProfiles = asyncHandler(async (req, res) => {
  const { gender, age, location } = req.query;

  const query = {};

  if (gender) query.gender = gender;
  if (age) query.age = { $lte: Number(age) };
  if (location) query.location = { $regex: location, $options: "i" };

  const profiles = await Profile.find(query).populate("user", "-password");

  res.json(profiles);
});


// POST /api/users/shortlist/:id
export const shortlistUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  const targetUserId = req.params.id;

  if (!currentUser.likedUsers.includes(targetUserId)) {
    currentUser.likedUsers.push(targetUserId);
    await currentUser.save();
  }

  res.json({ message: 'User shortlisted' });
});


// GET /api/users/shortlisted
export const getShortlistedUsers = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id).populate({
    path: 'likedUsers',
    select: '-password',
  });

  res.json(currentUser.likedUsers);
});


// GET /api/users/profiles?age=25&gender=female&location=Delhi&religion=Hindu
export const getFilteredProfiles = asyncHandler(async (req, res) => {
  const { age, gender, location, religion } = req.query;

  let filter = { isAdmin: false, isBlocked: false };

  if (age) filter.age = { $gte: parseInt(age) };
  if (gender) filter.gender = gender;
  if (location) filter.location = new RegExp(location, 'i');
  if (religion) filter.religion = new RegExp(religion, 'i');

  const users = await User.find(filter).select('-password');
  res.json(users);
});


export const getShortlistedProfiles = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).populate('shortlisted');

    const profiles = await Profile.find({
      user: { $in: currentUser.shortlisted },
    }).populate("user", "name email");

    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching shortlisted users" });
  }
};


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
// @desc    Update or Create user profile if not found
// @route   PUT /api/users/profile
// @access  Private
export const updateMyProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    // 🔧 Create new profile if not found
    profile = new Profile({ user: req.user._id });
  }

  profile.age = req.body.age || profile.age;
  profile.gender = req.body.gender || profile.gender;
  profile.religion = req.body.religion || profile.religion;
  profile.location = req.body.location || profile.location;
  profile.bio = req.body.bio || profile.bio;

  if (req.file) {
    profile.image = req.file.path;
  }

  const updated = await profile.save();
  res.json(updated);
});



// controllers/userController.js
export const createProfile = asyncHandler(async (req, res) => {
  try {
    console.log('📦 Body:', req.body); // already added by you
    console.log('📷 File:', req.file);

    const existing = await Profile.findOne({ user: req.user._id });
    if (existing) {
      res.status(400);
      throw new Error('Profile already exists');
    }

    const profile = new Profile({
      user: req.user._id,
      age: req.body.age,
      gender: req.body.gender,
      religion: req.body.religion,
      location: req.body.location,
      bio: req.body.bio,
      image: req.body.image, // from Cloudinary
    });

    const created = await profile.save();
    res.status(201).json(created);
  } catch (err) {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({ message: err.message });
  }
});