const express = require('express');
const {
  uploadSong,
  getSongs,
  updateSong,
  replaceAudio,
  replaceThumbnail,
  deleteSong,
  getRecommendations,
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

module.exports = router;