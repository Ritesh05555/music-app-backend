const express = require('express');
const router = express.Router();

const {
  createPlaylist,
  getPlaylists,
  getPlaylistById, 
  updatePlaylist,
  deletePlaylist,
  deleteSongFromPlaylist
} = require('../controllers/playlistController');

const authMiddleware = require('../middleware/authMiddleware'); // Correct import

// Routes with middleware
router.post('/', authMiddleware, createPlaylist);
router.get('/', authMiddleware, getPlaylists);
router.get('/:id', authMiddleware, getPlaylistById);
router.put('/:id', authMiddleware, updatePlaylist);
router.delete('/:id', authMiddleware, deletePlaylist);
router.delete('/:playlistId/songs/:songId', authMiddleware, deleteSongFromPlaylist); 

module.exports = router;
