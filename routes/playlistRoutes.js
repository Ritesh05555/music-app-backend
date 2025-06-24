// const express = require('express');
// const {
//   createPlaylist,
//   getPlaylists,
//   updatePlaylist,
//   deletePlaylist,
// } = require('../controllers/playlistController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authMiddleware, createPlaylist);
// router.get('/', authMiddleware, getPlaylists);
// router.put('/:id', authMiddleware, updatePlaylist);
// router.delete('/:id', authMiddleware, deletePlaylist);
// router.delete('/:playlistId/songs/:songId', auth, deleteSongFromPlaylist); // New route

// module.exports = router;

const express = require('express');
const router = express.Router();

const {
  createPlaylist,
  getPlaylists,
  updatePlaylist,
  deletePlaylist,
  deleteSongFromPlaylist
} = require('../controllers/playlistController');

const authMiddleware = require('../middleware/authMiddleware'); // Correct import

// Routes with middleware
router.post('/', authMiddleware, createPlaylist);
router.get('/', authMiddleware, getPlaylists);
router.put('/:id', authMiddleware, updatePlaylist);
router.delete('/:id', authMiddleware, deletePlaylist);
router.delete('/:playlistId/songs/:songId', authMiddleware, deleteSongFromPlaylist); // New route

module.exports = router;
