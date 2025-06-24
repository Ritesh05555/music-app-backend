const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }],
  interests: {
    singers: [String],
    moods: [String],
    genres: [String],
  },
});

module.exports = mongoose.model('User', userSchema);