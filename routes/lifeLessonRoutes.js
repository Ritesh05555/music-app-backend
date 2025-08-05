const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addLifeLesson, getAllLifeLessons } = require('../controllers/lifeLessonController');
const authMiddleware = require('../middleware/authMiddleware');


const upload = multer({ storage: multer.memoryStorage() });

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
