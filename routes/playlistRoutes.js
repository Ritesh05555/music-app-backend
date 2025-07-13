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

// const express = require('express');
// const router = express.Router();

// const {
//   createPlaylist,
//   getPlaylists,
//   getPlaylistById, // 👈 Add this
//   updatePlaylist,
//   deletePlaylist,
//   deleteSongFromPlaylist
// } = require('../controllers/playlistController');

// const authMiddleware = require('../middleware/authMiddleware'); // Correct import

// // Routes with middleware
// router.post('/', authMiddleware, createPlaylist);
// router.get('/', authMiddleware, getPlaylists);
// router.get('/:id', authMiddleware, getPlaylistById);
// router.put('/:id', authMiddleware, updatePlaylist);
// router.delete('/:id', authMiddleware, deletePlaylist);
// router.delete('/:playlistId/songs/:songId', authMiddleware, deleteSongFromPlaylist); // New route

// module.exports = router;
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
router.delete('/:playlistId/items/:itemId', authMiddleware, removeItemFromPlaylist);
router.post('/:id/addItem', authMiddleware, addItemToPlaylist);
module.exports = router;
