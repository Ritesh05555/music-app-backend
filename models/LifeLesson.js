const mongoose = require('mongoose');

const lifeLessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Cloudinary URL
    audio: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('LifeLesson', lifeLessonSchema);
