// const mongoose = require('mongoose');

// const playlistSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Playlist', playlistSchema);

const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    items: [{
        itemType: { type: String, enum: ['Song', 'OTS', 'LifeLesson'], required: true },
        itemRef: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'items.itemType' }
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Playlist', playlistSchema);
