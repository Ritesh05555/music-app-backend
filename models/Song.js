// const mongoose = require('mongoose');

// const songSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   singer: { type: String, required: true },
//   mood: { type: String },
//   movie: { type: String },
//   genre: { type: String, required: true },
//   duration: { type: Number, required: true },
//   audioUrl: { type: String, required: true },
//   thumbnailUrl: { type: String, required: true },
//   uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Song', songSchema);

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  singer: { type: String, required: true },
  mood: String,
  movie: String,
  genre: String,
  duration: Number,
  audioUrl: String,
  thumbnailUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Song', songSchema);
