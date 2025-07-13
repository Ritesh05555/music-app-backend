const express = require('express');
const router = express.Router();

const {
    createPlaylist,
    getPlaylists,
    getPlaylistById,
    addItemToPlaylist,
    removeItemFromPlaylist
} = require('../controllers/playlistController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPlaylist);
router.get('/', authMiddleware, getPlaylists);
router.get('/:id', authMiddleware, getPlaylistById);
router.post('/:id/addItem', authMiddleware, addItemToPlaylist);
router.delete('/:playlistId/items/:itemId', authMiddleware, removeItemFromPlaylist);

module.exports = router;
