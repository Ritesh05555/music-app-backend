// const express = require('express');
// const {
//   uploadSong,
//   getSongs,
//   updateSong,
//   replaceAudio,
//   replaceThumbnail,
//   deleteSong,
//   getRecommendations,
//     getSongById,  
//   getSongName,
//   getSingerName,
//   getMood,
//   getGenre,
//   getMovie,
//   updateSongTitle,
//   updateSongSinger,
//   updateSongMood,
//   updateSongMovie,
//   updateSongGenre,
//   updateSongDuration
// } = require('../controllers/songController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const router = express.Router();

// // Upload new song (audio + thumbnail)
// router.post(
//   '/',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.fields([{ name: 'audio' }, { name: 'thumbnail' }]),
//   uploadSong
// );

// // Get all songs or filtered songs
// router.get('/', getSongs);

// // Update full song details
// router.put('/:id', authMiddleware, roleMiddleware('admin'), updateSong);

// // Replace audio file
// router.patch(
//   '/:id/audio',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.single('audio'),
//   replaceAudio
// );

// // Replace thumbnail image
// router.patch(
//   '/:id/thumbnail',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.single('thumbnail'),
//   replaceThumbnail
// );

// // Delete song
// router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteSong);

// // Get recommendations for logged-in user
// router.get('/recommendations', authMiddleware, getRecommendations);

// // Get individual song attributes
// router.get('/name/:songId', getSongName);
// router.get('/singer/:songId', getSingerName);
// router.get('/mood/:songId', getMood);
// router.get('/genre/:songId', getGenre);

// router.get('/movie/:songId', getMovie);
// router.get('/:id', authMiddleware, getSongById);
// // NEW: Update individual fields
// router.patch('/:id/title', authMiddleware, roleMiddleware('admin'), updateSongTitle);
// router.patch('/:id/singer', authMiddleware, roleMiddleware('admin'), updateSongSinger);
// router.patch('/:id/mood', authMiddleware, roleMiddleware('admin'), updateSongMood);
// router.patch('/:id/movie', authMiddleware, roleMiddleware('admin'), updateSongMovie);
// router.patch('/:id/genre', authMiddleware, roleMiddleware('admin'), updateSongGenre);
// router.patch('/:id/duration', authMiddleware, roleMiddleware('admin'), updateSongDuration);

// module.exports = router;

const express = require('express');
const {
    uploadSong,
    getSongs,
    updateSong,
    replaceAudio,
    replaceThumbnail,
    deleteSong,
    getRecommendations,
    getSongById,  
    getSongName,
    getSingerName,
    getMood,
    getGenre,
    getMovie,
    updateSongTitle,
    updateSongSinger,
    updateSongMood,
    updateSongMovie,
    updateSongGenre,
    updateSongDuration,
    getMoodSongsByLanguage  // ✅ ADD THIS LINE
} = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

// Upload new song (audio + thumbnail)
router.post(
    '/',
    authMiddleware,
    roleMiddleware('admin'),
    upload.fields([{ name: 'audio' }, { name: 'thumbnail' }]),
    uploadSong
);

// Get all songs or filtered songs
router.get('/', getSongs);

// NEW: Get mood songs filtered by language (for mood screens) ✅
router.get('/mood/:mood', getMoodSongsByLanguage);

// Update full song details
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateSong);

// Replace audio file
router.patch(
    '/:id/audio',
    authMiddleware,
    roleMiddleware('admin'),
    upload.single('audio'),
    replaceAudio
);

// Replace thumbnail image
router.patch(
    '/:id/thumbnail',
    authMiddleware,
    roleMiddleware('admin'),
    upload.single('thumbnail'),
    replaceThumbnail
);

// Delete song
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteSong);

// Get recommendations for logged-in user
router.get('/recommendations', authMiddleware, getRecommendations);

// Get individual song attributes
router.get('/name/:songId', getSongName);
router.get('/singer/:songId', getSingerName);
router.get('/mood/:songId', getMood);
router.get('/genre/:songId', getGenre);
router.get('/movie/:songId', getMovie);
router.get('/:id', authMiddleware, getSongById);

// NEW: Update individual fields
router.patch('/:id/title', authMiddleware, roleMiddleware('admin'), updateSongTitle);
router.patch('/:id/singer', authMiddleware, roleMiddleware('admin'), updateSongSinger);
router.patch('/:id/mood', authMiddleware, roleMiddleware('admin'), updateSongMood);
router.patch('/:id/movie', authMiddleware, roleMiddleware('admin'), updateSongMovie);
router.patch('/:id/genre', authMiddleware, roleMiddleware('admin'), updateSongGenre);
router.patch('/:id/duration', authMiddleware, roleMiddleware('admin'), updateSongDuration);

module.exports = router;
