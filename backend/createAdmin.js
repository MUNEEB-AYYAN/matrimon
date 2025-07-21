import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

await User.deleteOne({ email: 'admin@example.com' });

const admin = new User({
  name: 'Admin User',
  email: 'admin@example.com',
  password: await bcrypt.hash('admin123', 10),
  phone: '9876543210',
  isAdmin: true,
});

await admin.save();
console.log("✅ Admin user created");
process.exit();
