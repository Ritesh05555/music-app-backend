// const { spawn } = require('child_process');
// const path = require('path');
// const Song = require('../models/Song.js');

// const getDynamicRecommendations = async (req, res) => {
//   try {
//     const criteria = req.body;

//     const allSongs = await Song.find({}).lean();
//     if (!allSongs || allSongs.length === 0) {
//       return res.status(404).json({ message: 'No songs found in the database.' });
//     }
    
//     const scriptPath = path.join(__dirname, '..', 'ml', 'recommender.py');
    
    
//     const pythonProcess = spawn('python', [scriptPath, JSON.stringify(criteria)]);
 

//     pythonProcess.stdin.write(JSON.stringify(allSongs));
//     pythonProcess.stdin.end();

//     let recommendations = '';
//     let errorData = '';

//     pythonProcess.stdout.on('data', (data) => (recommendations += data.toString()));
//     pythonProcess.stderr.on('data', (data) => (errorData += data.toString()));

//     pythonProcess.on('close', (code) => {
//       if (code !== 0) {
//         console.error(`Python script error: ${errorData}`);
//         return res.status(500).json({ message: 'Failed to get recommendations', error: errorData });
//       }
//       try {
//         res.status(200).json(JSON.parse(recommendations));
//       } catch (e) {
//         res.status(500).json({ message: 'Failed to parse recommendations', error: e.message });
//       }
//     });

//   } catch (error) {
//     console.error('Controller Error:', error);
//     res.status(500).json({ message: 'Server error while getting recommendations.' });
//   }
// };

// module.exports = {
//   getDynamicRecommendations,
// };

// controllers/recommendationController.js
const { spawn } = require('child_process');
const path = require('path'); // FIX: Changed 'path' to require('path')
const ListeningHistory = require('../models/listeningHistory');
const { getSongData, getEmbeddings, getIsModelReady } = require('../ml/init');

const getRecommendationsForUser = async (req, res) => {
  try {
    if (!getIsModelReady()) {
      return res.status(503).json({ message: 'Recommendation engine is warming up. Please try again in a moment.' });
    }

    const userId = req.user.id;

    const history = await ListeningHistory.find({ user: userId })
      .sort({ listenedAt: -1 })
      .limit(50)
      .populate('song')
      .lean();

    if (!history.length) {
      return res.json([]);
    }

    const uniqueSongs = [];
    const seenSongIds = new Set();
    for (const item of history) {
      if (item.song && !seenSongIds.has(item.song._id.toString())) {
        uniqueSongs.push(item.song);
        seenSongIds.add(item.song._id.toString());
      }
      if (uniqueSongs.length >= 7) break;
    }

    if (uniqueSongs.length === 0) {
      return res.json([]);
    }
    
    const dataForScript = {
      seedSongs: uniqueSongs,
      allSongs: getSongData(),
      embeddings: getEmbeddings(),
    };

    const scriptPath = path.join(__dirname, '..', 'ml', 'recommender.py');
    const pythonProcess = spawn('python', [scriptPath, 'recommend']);

    pythonProcess.stdin.write(JSON.stringify(dataForScript));
    pythonProcess.stdin.end();

    let recommendations = '';
    pythonProcess.stdout.on('data', (data) => { recommendations += data.toString(); });
    pythonProcess.stderr.on('data', (data) => { console.error(`[ML Reco Stderr]: ${data}`); });
    
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ message: 'Failed to get recommendations.' });
      }
      try {
        res.status(200).json(JSON.parse(recommendations));
      } catch (e) {
        res.status(500).json({ message: 'Failed to parse recommendations from script.' });
      }
    });

  } catch (error) {
    console.error('Recommendation Controller Error:', error);
    res.status(500).json({ message: 'Server error while getting recommendations.' });
  }
};

module.exports = {
  getRecommendationsForUser,
};

