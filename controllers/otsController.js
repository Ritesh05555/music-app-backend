// const OTS = require('../models/OTS');

// const addOTS = async (req, res) => {
//     const { title, movieName, category, thumbnail, audio } = req.body;

//     try {
//         const newOTS = new OTS({ title, movieName, category, thumbnail, audio });
//         await newOTS.save();
//         res.status(201).json(newOTS);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getAllOTS = async (req, res) => {
//     try {
//         const otsList = await OTS.find();
//         res.json(otsList);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = { addOTS, getAllOTS };


const OTS = require('../models/OTS');

const addOTS = async (req, res) => {
    // Text fields are still in req.body
    const { title, movieName, category } = req.body;
    // File fields are in req.files (from multer)
    const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
    const audioFile = req.files['audio'] ? req.files['audio'][0] : null;

    try {
        let thumbnailUrl = '';
        let audioUrl = '';

        if (thumbnailFile) {
            // Upload thumbnail buffer to Cloudinary
            const thumbnailResult = await cloudinary.uploader.upload(`data:${thumbnailFile.mimetype};base64,${thumbnailFile.buffer.toString('base64')}`, {
                folder: 'ots_thumbnails',
            });
            thumbnailUrl = thumbnailResult.secure_url;
        }

        if (audioFile) {
            // Upload audio buffer to Cloudinary
            const audioResult = await cloudinary.uploader.upload(`data:${audioFile.mimetype};base64,${audioFile.buffer.toString('base64')}`, {
                resource_type: "video", // Important for audio files
                folder: 'ots_audio',
            });
            audioUrl = audioResult.secure_url;
        }

        const newOTS = new OTS({
            title,
            movieName,
            category,
            thumbnail: thumbnailUrl,
            audio: audioUrl
        });
        await newOTS.save();
        res.status(201).json(newOTS);
    } catch (error) {
        console.error('Error adding OTS:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllOTS = async (req, res) => {
    try {
        const otsList = await OTS.find();
        res.json(otsList);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { addOTS, getAllOTS };