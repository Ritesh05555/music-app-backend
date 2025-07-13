// const LifeLesson = require('../models/LifeLesson');

// const addLifeLesson = async (req, res) => {
//     const { title, thumbnail, audio } = req.body;

//     try {
//         const newLesson = new LifeLesson({ title, thumbnail, audio });
//         await newLesson.save();
//         res.status(201).json(newLesson);
//     } catch (error) {
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

// module.exports = { addLifeLesson, getAllLifeLessons };

const LifeLesson = require('../models/LifeLesson');

const addLifeLesson = async (req, res) => {
    // Text fields will still be in req.body
    const { title } = req.body;
    // File fields will be in req.files (from multer)
    const thumbnailFile = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const audioFile = req.files && req.files['audio'] ? req.files['audio'][0] : null;

    try {
        let thumbnailUrl = '';
        let audioUrl = '';

        // Upload thumbnail to Cloudinary if provided
        if (thumbnailFile) {
            const thumbnailResult = await cloudinary.uploader.upload(`data:${thumbnailFile.mimetype};base64,${thumbnailFile.buffer.toString('base64')}`, {
                folder: 'lifelesson_thumbnails', // Optional: specific folder in Cloudinary
            });
            thumbnailUrl = thumbnailResult.secure_url;
        }

        // Upload audio to Cloudinary if provided
        if (audioFile) {
            const audioResult = await cloudinary.uploader.upload(`data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`, {
                resource_type: "video", // Important: Use "video" for audio files in Cloudinary
                folder: 'lifelesson_audio', // Optional: specific folder in Cloudinary
            });
            audioUrl = audioResult.secure_url;
        }

        const newLesson = new LifeLesson({
            title,
            thumbnail: thumbnailUrl,
            audio: audioUrl
        });
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (error) {
        console.error('Error adding life lesson:', error); // Log the full error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllLifeLessons = async (req, res) => {
    try {
        const lessons = await LifeLesson.find();
        res.json(lessons);
    } catch (error) {
        console.error('Error getting life lessons:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addLifeLesson, getAllLifeLessons };