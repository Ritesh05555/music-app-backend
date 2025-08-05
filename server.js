const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Export cloudinary globally for controllers
global.cloudinary = cloudinary;


const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:8081',
    'http://localhost:3000',
    'https://sundhun.onrender.com',
    'http://192.168.0.102:5173',
    'https://music-admin.onrender.com',
    'https://test-music-front.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}));


// Connect to DB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});


// Import routes after middleware and DB connection
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRequestRoutes = require('./routes/songRequestRoutes');
const otsRoutes = require('./routes/otsRoutes');
const lifeLessonRoutes = require('./routes/lifeLessonRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes.js'); 


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/song-requests', songRequestRoutes);
app.use('/api/ots', otsRoutes);
app.use('/api/lifelessons', lifeLessonRoutes);
app.use('/api/recommendations', recommendationRoutes); // <-- ADD THIS LINE


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
