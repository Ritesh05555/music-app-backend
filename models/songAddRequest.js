const mongoose = require('mongoose');

const songRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  movie: { type: String, required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: 172800 }  // 48 hours = 172800 seconds
});

module.exports = mongoose.model('SongRequest', songRequestSchema);
