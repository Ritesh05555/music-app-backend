// const express = require('express');
// const {
//   uploadSong,
//   getSongs,
//   updateSong,
//   replaceAudio,
//   replaceThumbnail,
//   deleteSong,
//   getRecommendations,
// } = require('../controllers/songController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
// const router = express.Router();

// router.post(
//   '/',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.fields([{ name: 'audio' }, { name: 'thumbnail' }]),
//   uploadSong
// );
// router.get('/', getSongs);
// router.put('/:id', authMiddleware, roleMiddleware('admin'), updateSong);
// router.patch(
//   '/:id/audio',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.single('audio'),
//   replaceAudio
// );
// router.patch(
//   '/:id/thumbnail',
//   authMiddleware,
//   roleMiddleware('admin'),
//   upload.single('thumbnail'),
//   replaceThumbnail
// );
// router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteSong);
// router.get('/recommendations', authMiddleware, getRecommendations);

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
  getSongName,
  getSingerName,
  getMood,
  getGenre,
  getMovie,
} = require('../controllers/songController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  upload.fields([{ name: 'audio' }, { name: 'thumbnail' }]),
  uploadSong
);
router.get('/', getSongs);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateSong);
router.patch(
  '/:id/audio',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('audio'),
  replaceAudio
);
router.patch(
  '/:id/thumbnail',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('thumbnail'),
  replaceThumbnail
);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteSong);
router.get('/recommendations', authMiddleware, getRecommendations);

// New endpoints for individual song attributes
router.get('/name/:songId', getSongName);
router.get('/singer/:songId', getSingerName);
router.get('/mood/:songId', getMood);
router.get('/genre/:songId', getGenre);
router.get('/movie/:songId', getMovie);

module.exports = router;