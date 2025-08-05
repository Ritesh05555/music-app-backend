const { spawn } = require('child_process');
const path = require('path');
const Song = require('../models/Song.js');

const getDynamicRecommendations = async (req, res) => {
  try {
    const criteria = req.body;

    const allSongs = await Song.find({}).lean();
    if (!allSongs || allSongs.length === 0) {
      return res.status(404).json({ message: 'No songs found in the database.' });
    }
    
    const scriptPath = path.join(__dirname, '..', 'ml', 'recommender.py');
    
    
    const pythonProcess = spawn('python', [scriptPath, JSON.stringify(criteria)]);
 

    pythonProcess.stdin.write(JSON.stringify(allSongs));
    pythonProcess.stdin.end();

    let recommendations = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => (recommendations += data.toString()));
    pythonProcess.stderr.on('data', (data) => (errorData += data.toString()));

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`Python script error: ${errorData}`);
        return res.status(500).json({ message: 'Failed to get recommendations', error: errorData });
      }
      try {
        res.status(200).json(JSON.parse(recommendations));
      } catch (e) {
        res.status(500).json({ message: 'Failed to parse recommendations', error: e.message });
      }
    });

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ message: 'Server error while getting recommendations.' });
  }
};

module.exports = {
  getDynamicRecommendations,
};
