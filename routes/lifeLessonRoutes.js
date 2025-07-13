// const express = require('express');
// const router = express.Router();
// const { addLifeLesson, getAllLifeLessons } = require('../controllers/lifeLessonController');
// const authMiddleware = require('../middleware/authMiddleware');

// // Routes
// router.post('/add', authMiddleware, addLifeLesson);
// router.get('/all', getAllLifeLessons);

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import multer
const { addLifeLesson, getAllLifeLessons } = require('../controllers/lifeLessonController');
const authMiddleware = require('../middleware/authMiddleware'); // Correct path for authMiddleware

// Configure multer to store files in memory (ideal for direct Cloudinary uploads)
const upload = multer({ storage: multer.memoryStorage() });

// Apply multer middleware to parse file fields
router.post('/add',
    authMiddleware,
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'audio', maxCount: 1 }
    ]),
    addLifeLesson
);
router.get('/all', getAllLifeLessons);

module.exports = router;