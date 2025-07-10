const SongAddRequest = require('../models/songAddRequest');

const createSongRequests = async (req, res) => {
  try {
    const requests = req.body;

    if (!Array.isArray(requests) || requests.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of song requests' });
    }

    if (requests.length > 5) {
      return res.status(400).json({ message: 'You can request up to 5 songs at a time' });
    }

    // Add user ID to each request
    const requestsWithUser = requests.map(reqData => ({
      ...reqData,
      requestedBy: req.user.id
    }));

    const createdRequests = await SongAddRequest.insertMany(requestsWithUser);

    res.status(201).json({ message: 'Requests submitted successfully', requests: createdRequests });
  } catch (error) {
    console.error('Error creating song requests:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllSongRequests = async (req, res) => {
  try {
    const requests = await SongAddRequest.find().populate('requestedBy', 'fullName email');
    res.json(requests);
  } catch (error) {
    console.error('Get song requests error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { createSongRequests, getAllSongRequests };
