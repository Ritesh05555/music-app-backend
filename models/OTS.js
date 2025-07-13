const mongoose = require('mongoose');

const otsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    movieName: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Cloudinary URL
    audio: { type: String, required: true }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('OTS', otsSchema);
