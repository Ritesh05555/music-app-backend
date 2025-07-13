
const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const { addOTS, getAllOTS } = require('../controllers/otsController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer to store files in memory (suitable for direct Cloudinary upload)
const upload = multer({ storage: multer.memoryStorage() });

// Apply multer middleware to parse file fields
router.post('/add', authMiddleware, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), addOTS);
router.get('/all', getAllOTS);

module.exports = router;