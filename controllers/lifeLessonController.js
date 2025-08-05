

const LifeLesson = require('../models/LifeLesson');
const cloudinary = require('../config/cloudinary'); 

const addLifeLesson = async (req, res) => {
    const { title, description } = req.body; 
    const thumbnailFile = req.files && req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const audioFile = req.files && req.files['audio'] ? req.files['audio'][0] : null;

    try {
        let thumbnailUrl = '';
        let audioUrl = '';

        // ✅ Upload thumbnail to Cloudinary
        if (thumbnailFile) {
            const thumbnailResult = await cloudinary.uploader.upload(`data:${thumbnailFile.mimetype};base64,${thumbnailFile.buffer.toString('base64')}`, {
                folder: 'lifelesson_thumbnails',
            });
            thumbnailUrl = thumbnailResult.secure_url;
        }

        // ✅ Upload audio to Cloudinary
        if (audioFile) {
            const audioResult = await cloudinary.uploader.upload(`data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`, {
                resource_type: "video",
                folder: 'lifelesson_audio',
            });
            audioUrl = audioResult.secure_url;
        }

        const newLesson = new LifeLesson({
            title,
            description, 
            thumbnail: thumbnailUrl,
            audio: audioUrl
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
        console.error('Error getting life lessons:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addLifeLesson, getAllLifeLessons };
