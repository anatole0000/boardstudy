// app.js (Express server)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieSession = require('cookie-session');

const app = express();

// CORS Configuration: Allow only your frontend's URL and allow credentials
const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true,  // Allow cookies/credentials
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    keys: ['yourSecretKey'], // Replace with a strong secret in production
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// API routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/goals', require('./routes/learningGoals'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ai', require('./routes/ai'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
