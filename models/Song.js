const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  singer: { type: String, required: true },
  mood: String,
  movie: String,
  genre: String,
  language: { type: String, required: true },
  duration: Number,
  audioUrl: String,
  thumbnailUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Song', songSchema);
