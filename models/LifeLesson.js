// const mongoose = require('mongoose');

// const lifeLessonSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     thumbnail: { type: String, required: true }, // Cloudinary URL
//     audio: { type: String, required: true }, // Cloudinary URL
// }, { timestamps: true });

// module.exports = mongoose.model('LifeLesson', lifeLessonSchema);

// const mongoose = require('mongoose');

// const lifeLessonSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String }, 
//   language: [{ type: String }], // <-- use array
//     category: [{ type: String }], 
//     thumbnail: { type: String, required: true },   
//     audio: { type: String, required: true },      
// }, { timestamps: true });

// module.exports = mongoose.model('LifeLesson', lifeLessonSchema);

const mongoose = require('mongoose');

const lifeLessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    language: [{ type: String }],
    category: [{ type: String }],
    thumbnail: { type: String, required: true },
    audio: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('LifeLesson', lifeLessonSchema);