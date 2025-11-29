// models/listeningHistory.js
const mongoose = require('mongoose');

const listeningHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true,
  },
  listenedAt: {
    type: Date,
    default: Date.now,
    // This TTL index automatically removes documents after 2 days (172800 seconds)
    expires: '2d', 
  },
});


const ListeningHistory = mongoose.model('ListeningHistory', listeningHistorySchema);
module.exports = ListeningHistory;
