// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const { logSongListen } = require('../controllers/historyController');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Protect the route to ensure we have a user ID
router.post('/log', authMiddleware, logSongListen);

module.exports = router;
