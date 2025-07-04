// const express = require('express');
// const { createSongRequest, getAllSongRequests } = require('../controllers/songRequestController');
// const authMiddleware = require('../middleware/authMiddleware');
// const roleMiddleware = require('../middleware/roleMiddleware');
// const { createSongRequests, getAllSongRequests } = require('../controllers/songRequestController');

// router.post('/', authMiddleware, createSongRequests);
// router.get('/', authMiddleware, roleMiddleware('admin'), getAllSongRequests);

// const router = express.Router();

// // User submits a request
// router.post('/', authMiddleware, createSongRequest);

// // Admin views all requests
// router.get('/', authMiddleware, roleMiddleware('admin'), getAllSongRequests);

// module.exports = router;


const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createSongRequests, getAllSongRequests } = require('../controllers/songRequestController');

const router = express.Router();

router.post('/', authMiddleware, createSongRequests);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllSongRequests);

module.exports = router;
