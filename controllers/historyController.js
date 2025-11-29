// controllers/historyController.js
const ListeningHistory = require('../models/listeningHistory');

const logSongListen = async (req, res) => {
  try {
    const userId = req.user.id; // From your auth middleware
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ message: 'Song ID is required.' });
    }

    const newListen = new ListeningHistory({
      user: userId,
      song: songId,
    });

    await newListen.save();
    res.status(201).json({ success: true, message: 'Listen logged.' });
  } catch (error) {
    // Fail silently on the frontend but log it on the backend
    console.error('Error logging song listen:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { logSongListen };
