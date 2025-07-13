const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { createSongRequests, getAllSongRequests } = require('../controllers/songRequestController');

const router = express.Router();

router.post('/', authMiddleware, createSongRequests);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllSongRequests);

module.exports = router;
