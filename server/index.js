// 📦 Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 🚀 Initialize app
const app = express();

// 🔐 Middleware
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Auth middleware
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

// 📦 Routes
const authRoutes = require('./routes/authRoutes');
const goalRoutes = require('./routes/goalsRoutes');

// 🔐 Middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());

// 📡 Route Registration
app.use('/api/auth', authRoutes);  // authRoutes must be initialized after `app`
app.use('/api/goals', goalRoutes);  // goalRoutes must be initialized after `app`

// 🏠 Optional home route
app.get('/', (req, res) => {
  res.send('Welcome to Cyber Goals API');
});

// 🔌 Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Connected to MongoDB Atlas`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
