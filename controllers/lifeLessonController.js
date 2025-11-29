// const LifeLesson = require('../models/LifeLesson');
// const cloudinary = require('../config/cloudinary');

// const addLifeLesson = async (req, res) => {
//     const { title, description, language, category } = req.body;
//     const thumbnailFile = req.files?.thumbnail?.[0] || null;
//     const audioFile = req.files?.audio?.[0] || null;

//     try {
//         let thumbnailUrl = '';
//         let audioUrl = '';

//         if (thumbnailFile) {
//             const thumbnailResult = await cloudinary.uploader.upload(
//                 `data:${thumbnailFile.mimetype};base64,${thumbnailFile.buffer.toString('base64')}`,
//                 { folder: 'lifelesson_thumbnails' }
//             );
//             thumbnailUrl = thumbnailResult.secure_url;
//         }

//         if (audioFile) {
//             const audioResult = await cloudinary.uploader.upload(
//                 `data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`,
//                 {
//                     resource_type: 'video',
//                     folder: 'lifelesson_audio',
//                 }
//             );
//             audioUrl = audioResult.secure_url;
//         }

//         const newLesson = new LifeLesson({
//             title,
//             description,
//             language: language?.split(',').map(l => l.trim()),
//             category: category?.split(',').map(c => c.trim()),
//             thumbnail: thumbnailUrl,
//             audio: audioUrl,
//         });

//         await newLesson.save();
//         res.status(201).json(newLesson);
//     } catch (error) {
//         console.error('Error adding life lesson:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getAllLifeLessons = async (req, res) => {
//     try {
//         const lessons = await LifeLesson.find();
//         res.json(lessons);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getLifeLessonsByCategory = async (req, res) => {
//     const category = req.params.category;
//     try {
//         const lessons = await LifeLesson.find({ category: { $in: [category] } });
//         res.json(lessons);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getLifeLessonsByLanguage = async (req, res) => {
//     try {
//         const languageQuery = req.params.language.toLowerCase().trim();

//         const lessons = await LifeLesson.find({
//             language: { $regex: new RegExp(`\\b${languageQuery}\\b`, 'i') }
//         });

//         res.json(lessons);
//     } catch (error) {
//         console.error('Error filtering by language:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


// module.exports = {
//     addLifeLesson,
//     getAllLifeLessons,
//     getLifeLessonsByCategory,
//     getLifeLessonsByLanguage,
// };

const LifeLesson = require('../models/LifeLesson');
const cloudinary = require('../config/cloudinary');

const addLifeLesson = async (req, res) => {
    const { title, description, language, category } = req.body;
    const thumbnailFile = req.files?.thumbnail?.[0] || null;
    const audioFile = req.files?.audio?.[0] || null;

    try {
        let thumbnailUrl = '';
        let audioUrl = '';

        if (thumbnailFile) {
            const thumbnailResult = await cloudinary.uploader.upload(
                `data:${thumbnailFile.mimetype};base64,${thumbnailFile.buffer.toString('base64')}`,
                { folder: 'lifelesson_thumbnails' }
            );
            thumbnailUrl = thumbnailResult.secure_url;
        }

        if (audioFile) {
            const audioResult = await cloudinary.uploader.upload(
                `data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`,
                {
                    resource_type: 'video',
                    folder: 'lifelesson_audio',
                }
            );
            audioUrl = audioResult.secure_url;
        }

        const newLesson = new LifeLesson({
            title,
            description,
            language: language?.split(',').map(l => l.trim()),
            category: category?.split(',').map(c => c.trim()),
            thumbnail: thumbnailUrl,
            audio: audioUrl,
        });

        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        console.error('Error adding life lesson:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllLifeLessons = async (req, res) => {
    try {
        const lessons = await LifeLesson.find();
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getLifeLessonsByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        // Correct query to check if the category string exists within the category array
        const lessons = await LifeLesson.find({ category: category }); 
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getLifeLessonsByLanguage = async (req, res) => {
    try {
        const languageQuery = req.params.language.toLowerCase().trim();

        const lessons = await LifeLesson.find({
            language: { $regex: new RegExp(`\\b${languageQuery}\\b`, 'i') }
        });

        res.json(lessons);
    } catch (error) {
        console.error('Error filtering by language:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addLifeLesson,
    getAllLifeLessons,
    getLifeLessonsByCategory,
    getLifeLessonsByLanguage,
};
