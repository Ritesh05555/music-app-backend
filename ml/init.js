// // ml/init.js
// const { spawn } = require('child_process');
// const path = require('path');
// const Song = require('../models/Song.js'); 


// let songDataForML = null;
// let songEmbeddings = null;
// let isModelReady = false;


// const initializeModel = () => {
//   console.log('🤖 [ML] Starting model initialization...');
  
//   Song.find({}).lean()
//     .then(songs => {
//       if (!songs || songs.length === 0) {
//         console.warn('⚠️ [ML] No songs found in the database. Recommendation engine will be inactive.');
//         return;
//       }
      
//       // Store the raw song data in memory
//       songDataForML = songs;
      
//       const scriptPath = path.join(__dirname, 'recommender.py');
//       const pythonProcess = spawn('python', [scriptPath, 'init']);

//       // Send all songs to the Python script's standard input
//       pythonProcess.stdin.write(JSON.stringify(songs));
//       pythonProcess.stdin.end();

//       let dataBuffer = '';
//       pythonProcess.stdout.on('data', (data) => {
//         dataBuffer += data.toString();
//       });

//       pythonProcess.stderr.on('data', (data) => {
//         console.error(`[ML Init Stderr]: ${data}`);
//       });

//       pythonProcess.on('close', (code) => {
//         if (code !== 0) {
//           console.error(`[ML Init Error] Python script exited with code ${code}`);
//           return;
//         }
//         try {
//           // Store the computed embeddings map in memory
//           songEmbeddings = JSON.parse(dataBuffer);
//           isModelReady = true;
//           console.log(`✅ [ML] Model ready. ${Object.keys(songEmbeddings).length} song embeddings loaded.`);
//         } catch (e) {
//           console.error('[ML Init Error] Failed to parse embeddings from Python script.', e);
//         }
//       });
//     })
//     .catch(err => {
//       console.error('[ML Init Error] Could not fetch songs from database for initialization.', err);
//     });
// };

// module.exports = {
//   initializeModel,
//   // These functions provide safe access to the in-memory data
//   getSongData: () => songDataForML,
//   getEmbeddings: () => songEmbeddings,
//   getIsModelReady: () => isModelReady,
// };
