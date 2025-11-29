// const express = require('express');
// const router = express.Router();

// const {
//     createPlaylist,
//     getPlaylists,
//     getPlaylistById,
//     addItemToPlaylist,
//     removeItemFromPlaylist
// } = require('../controllers/playlistController');

// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/', authMiddleware, createPlaylist);
// router.get('/', authMiddleware, getPlaylists);
// router.get('/:id', authMiddleware, getPlaylistById);
// router.post('/:id/addItem', authMiddleware, addItemToPlaylist);
// router.delete('/:playlistId/items/:itemId', authMiddleware, removeItemFromPlaylist);

// module.exports = router;


// const express = require('express');
// const router = express.Router();

// const {
//     createPlaylist,
//     getPlaylists,
//      deletePlaylist,
//     getPlaylistById,
//     addItemToPlaylist,
//     removeItemFromPlaylist,
//     deletePlaylist  // Add this import
// } = require('../controllers/playlistController');

// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/', authMiddleware, createPlaylist);
// router.get('/', authMiddleware, getPlaylists);
// router.get('/:id', authMiddleware, getPlaylistById);
// router.post('/:id/addItem', authMiddleware, addItemToPlaylist);
// router.delete('/:playlistId/items/:itemId', authMiddleware, removeItemFromPlaylist);
// router.delete('/:id', authMiddleware, deletePlaylist);  // Add this line

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
    createPlaylist,
    getPlaylists,
    getPlaylistById,
    addItemToPlaylist,
    removeItemFromPlaylist,
    deletePlaylist  // ONLY ONCE HERE
} = require('../controllers/playlistController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPlaylist);
router.get('/', authMiddleware, getPlaylists);
router.get('/:id', authMiddleware, getPlaylistById);
router.post('/:id/addItem', authMiddleware, addItemToPlaylist);
router.delete('/:playlistId/items/:itemId', authMiddleware, removeItemFromPlaylist);
router.delete('/:id', authMiddleware, deletePlaylist);  // Route is fine

module.exports = router;
