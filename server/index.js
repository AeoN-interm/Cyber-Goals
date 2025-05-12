// server/index.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

// Ensure .env is loaded correctly (specifically from server/.env)
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Initialize app
const app = express();

// Check if environment variables are being loaded correctly
console.log('MONGODB_URI:', process.env.MONGODB_URI);  // Debugging purpose to check if .env is loaded correctly
console.log('PORT:', process.env.PORT);  // Debugging purpose
console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Debugging purpose

// JWT secret key (Fallback to default if not found)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Auth middleware to protect routes
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalsRoutes');

// Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Cyber Goals API');
});

// Connect to MongoDB and start server
const connectDB = require('./config/database');
const PORT = process.env.PORT || 5000;

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
