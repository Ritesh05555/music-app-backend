
// const dotenv = require('dotenv');
// const cloudinary = require('cloudinary').v2;
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// // Export cloudinary for use in other files
// global.cloudinary = cloudinary;

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const songRoutes = require('./routes/songRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());
// connectDB();
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/songs', songRoutes);
// app.use('/api/playlists', playlistRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const dotenv = require('dotenv');
// const cloudinary = require('cloudinary').v2;
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Export cloudinary for use in other files
// global.cloudinary = cloudinary;

// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const songRoutes = require('./routes/songRoutes');
// const playlistRoutes = require('./routes/playlistRoutes');

// const app = express();




// app.use(cors({
//   origin: [
//     'http://localhost:5173','http://localhost:3000', 'http://192.168.0.109:5173' , 'https://sundhun.onrender.com',
//     'https://music-admin.onrender.com','https://test-music-front.onrender.com',
//     ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   credentials: true,
// }));



// app.use(express.json());

// // Add a simple GET endpoint to confirm server is running
// app.get('/', (req, res) => {
//   res.json({ message: 'Server is running' });
// });

// connectDB();
// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/songs', songRoutes);
// app.use('/api/playlists', playlistRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const songRoutes = require('./routes/songRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const songRequestRoutes = require('./routes/songRequestRoutes');  // ✅ NEW ROUTE

const app = express();

// CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://192.168.0.100:5173',
    'https://sundhun.onrender.com',
    'https://music-admin.onrender.com',
    'https://test-music-front.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
}));

// Body parser
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Connect to DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/song-requests', songRequestRoutes);   // ✅ NEW

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
