// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { addLifeLesson, getAllLifeLessons } = require('../controllers/lifeLessonController');
// const authMiddleware = require('../middleware/authMiddleware');


// const upload = multer({ storage: multer.memoryStorage() });

// router.post('/add',
//     authMiddleware,
//     upload.fields([
//         { name: 'thumbnail', maxCount: 1 },
//         { name: 'audio', maxCount: 1 }
//     ]),
//     addLifeLesson
// );

// router.get('/all', getAllLifeLessons);

// // module.exports = router;
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const {
//     addLifeLesson,
//     getAllLifeLessons,
//     getLifeLessonsByCategory,
//     getLifeLessonsByLanguage,
// } = require('../controllers/lifeLessonController');

// const authMiddleware = require('../middleware/authMiddleware');

// const upload = multer({ storage: multer.memoryStorage() });

// router.post(
//     '/add',
//     authMiddleware,
//     upload.fields([
//         { name: 'thumbnail', maxCount: 1 },
//         { name: 'audio', maxCount: 1 },
//     ]),
//     addLifeLesson
// );

// router.get('/all', getAllLifeLessons);
// router.get('/category/:category', getLifeLessonsByCategory);
// router.get('/language/:language', getLifeLessonsByLanguage);

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    addLifeLesson,
    getAllLifeLessons,
    getLifeLessonsByCategory,
    getLifeLessonsByLanguage,
} = require('../controllers/lifeLessonController');

const authMiddleware = require('../middleware/authMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

router.post(
    '/add',
    authMiddleware,
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]),
    addLifeLesson
);

router.get('/all', getAllLifeLessons);
router.get('/category/:category', getLifeLessonsByCategory);
router.get('/language/:language', getLifeLessonsByLanguage);

module.exports = router;
