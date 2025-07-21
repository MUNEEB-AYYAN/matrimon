// index.js
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

// Load env vars
dotenv.config();

// Connect MongoDB
connectDB();

// Initialize Express
const app = express();

// CORS Middleware
app.use(cors({
  origin: [process.env.CLIENT_URL, "http://localhost:5173"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Welcome to Matrimony Backend API _');
});

// JSON and Cookies Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

// Socket events
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// Start Server (important: use server.listen)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
