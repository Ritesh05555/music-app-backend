// const Song = require('../models/Song');
// // const cloudinary = require('../config/cloudinary');
// const User = require('../models/User');

// const uploadSong = async (req, res) => {
//   console.log('Request body:', req.body);
//   console.log('Request files:', req.files);

//   try {
//     const { title, description, singer, mood, movie, genre, duration } = req.body;
//     if (!title || !singer || !genre || !duration) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
//     if (!req.files || !req.files.audio || !req.files.thumbnail) {
//       return res.status(400).json({ message: 'Audio and thumbnail files are required' });
//     }

//     const audio = req.files.audio[0];
//     const thumbnail = req.files.thumbnail[0];

//     const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//     const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);

//     const song = new Song({
//       title,
//       description: description || '',
//       singer,
//       mood,
//       movie,
//       genre,
//       duration: parseInt(duration),
//       audioUrl: audioUpload.secure_url,
//       thumbnailUrl: thumbnailUpload.secure_url,
//       uploadedBy: req.user.id,
//     });

//     await song.save();
//     res.status(201).json(song);
//   } catch (error) {
//     console.error('Upload error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



// const getSongs = async (req, res) => {
//   const { mood, singer, movie, genre } = req.query;
//   const filters = {};

//   if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
//   if (singer) filters.singer = { $regex: new RegExp(singer, 'i') };
//   if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
//   if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

//   console.log('Applied filters:', filters);

//   try {
//     const songs = await Song.find(filters);
//     console.log('Found songs:', songs);
//     res.json(songs);
//   } catch (error) {
//     console.error('Get songs error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const updateSong = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     const { title, description, singer, mood, movie, genre, duration } = req.body;
//     song.title = title || song.title;
//     song.description = description || song.description;
//     song.singer = singer || song.singer;
//     song.mood = mood || song.mood;
//     song.movie = movie || song.movie;
//     song.genre = genre || song.genre;
//     song.duration = duration || song.duration;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Update song error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const replaceAudio = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     if (!req.files || !req.files.audio) {
//       return res.status(400).json({ message: 'Audio file is required' });
//     }

//     const audio = req.files.audio[0];
//     const audioUpload = await cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//     song.audioUrl = audioUpload.secure_url;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Replace audio error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const replaceThumbnail = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     if (!req.files || !req.files.thumbnail) {
//       return res.status(400).json({ message: 'Thumbnail file is required' });
//     }

//     const thumbnail = req.files.thumbnail[0];
//     const thumbnailUpload = await cloudinary.uploader.upload(thumbnail.path);
//     song.thumbnailUrl = thumbnailUpload.secure_url;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Replace thumbnail error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const deleteSong = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     await song.remove();
//     res.json({ message: 'Song deleted' });
//   } catch (error) {
//     console.error('Delete song error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getRecommendations = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const { singers, moods, genres } = user.interests;

//     const recommendedSongs = await Song.find({
//       $or: [
//         { singer: { $in: singers } },
//         { mood: { $in: moods } },
//         { genre: { $in: genres } },
//       ],
//     }).limit(10);

//     res.json(recommendedSongs);
//   } catch (error) {
//     console.error('Get recommendations error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// module.exports = {
//   uploadSong,
//   getSongs,
//   updateSong,
//   replaceAudio,
//   replaceThumbnail,
//   deleteSong,
//   getRecommendations,
// };


// const Fuse = require('fuse.js');
// const Song = require('../models/Song');
// const User = require('../models/User');

// // const cloudinary = require('../config/cloudinary');

// const uploadSong = async (req, res) => {
//   console.log('Request body:', req.body);
//   console.log('Request files:', req.files);

//   try {
//     const { title, description, singer, mood, movie, genre, duration } = req.body;
//     if (!title || !singer || !genre || !duration) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     if (!req.files || !req.files.audio || !req.files.thumbnail) {
//       return res.status(400).json({ message: 'Audio and thumbnail files are required' });
//     }

//     const audio = req.files.audio[0];
//     const thumbnail = req.files.thumbnail[0];

//     const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//     const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);

//     const song = new Song({
//       title,
//       description: description || '',
//       singer,
//       mood,
//       movie,
//       genre,
//       duration: parseInt(duration),
//       audioUrl: audioUpload.secure_url,
//       thumbnailUrl: thumbnailUpload.secure_url,
//       uploadedBy: req.user.id,
//     });

//     await song.save();
//     res.status(201).json(song);
//   } catch (error) {
//     console.error('Upload error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };


// // const getSongs = async (req, res) => {
// //   const { mood, singer, movie, genre, search } = req.query;
// //   let filters = {};

// //   // Add filters for mood, singer, movie, genre
// //   if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
// //   if (singer) filters.singer = { $regex: new RegExp(singer, 'i') };
// //   if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
// //   if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

// //   console.log('Applied filters (without search):', filters);

// //   try {
// //     let songs = await Song.find(filters); 
// //     // If user entered search text, apply fuzzy search
// //     if (search) {
// //       const options = {
// //         keys: ['title', 'singer', 'mood', 'movie', 'genre'], // fields to search
// //         threshold: 0.4, // how fuzzy (0 = strict, 1 = very fuzzy)
// //         distance: 100,  // max distance for fuzzy match
// //       };

// //       const fuse = new Fuse(songs, options);
// //       const result = fuse.search(search);

// //       // Map result back to actual song objects
// //       songs = result.map(r => r.item);
// //     }

// //     console.log('Found songs:', songs.length);
// //     res.json(songs);
// //   } catch (error) {
// //     console.error('Get songs error:', error.message);
// //     res.status(500).json({ message: 'Server error', error: error.message });
// //   }
// // };

// const getSongs = async (req, res) => {
//   const { mood, singer, movie, genre, search } = req.query;
//   let filters = {};

//   // Add filters for mood, singer, movie, genre
//   if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
//   // Exact, case-insensitive match for singer
//   if (singer) filters.singer = { $regex: new RegExp(`^${singer.trim()}$`, 'i') };
//   if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
//   if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

//   console.log('Applied filters (without search):', filters);

//   try {
//     let songs = await Song.find(filters); 
//     // If user entered search text, apply fuzzy search
//     if (search) {
//       const options = {
//         keys: ['title', 'singer', 'mood', 'movie', 'genre'],
//         threshold: 0.4,
//         distance: 100,
//       };

//       const fuse = new Fuse(songs, options);
//       const result = fuse.search(search);

//       songs = result.map(r => r.item);
//     }

//     console.log('Found songs:', songs.length);
//     res.json(songs);
//   } catch (error) {
//     console.error('Get songs error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };



// const updateSong = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     const { title, description, singer, mood, movie, genre, duration } = req.body;
//     song.title = title || song.title;
//     song.description = description || song.description;
//     song.singer = singer || song.singer;
//     song.mood = mood || song.mood;
//     song.movie = movie || song.movie;
//     song.genre = genre || song.genre;
//     song.duration = duration || song.duration;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Update song error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const replaceAudio = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     if (!req.files || !req.files.audio) {
//       return res.status(400).json({ message: 'Audio file is required' });
//     }

//     const audio = req.files.audio[0];
//     const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//     song.audioUrl = audioUpload.secure_url;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Replace audio error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const replaceThumbnail = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     // Change here: check req.file instead of req.files.thumbnail
//     if (!req.file) {
//       return res.status(400).json({ message: 'Thumbnail file is required' });
//     }

//     const thumbnail = req.file;
//     const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);
//     song.thumbnailUrl = thumbnailUpload.secure_url;

//     await song.save();
//     res.json(song);
//   } catch (error) {
//     console.error('Replace thumbnail error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const deleteSong = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.id);
//     if (!song) {
//       return res.status(404).json({ message: 'Song not found' });
//     }

//     await song.remove();
//     res.json({ message: 'Song deleted' });
//   } catch (error) {
//     console.error('Delete song error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getRecommendations = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const { singers, moods, genres } = user.interests;

//     const recommendedSongs = await Song.find({
//       $or: [
//         { singer: { $in: singers } },
//         { mood: { $in: moods } },
//         { genre: { $in: genres } },
//       ],
//     }).limit(10);

//     res.json(recommendedSongs);
//   } catch (error) {
//     console.error('Get recommendations error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const getSongName = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.songId);
//     if (!song) return res.status(404).json({ message: 'Song not found' });
//     res.status(200).json({ name: song.title });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getSingerName = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.songId);
//     if (!song) return res.status(404).json({ message: 'Song not found' });
//     res.status(200).json({ singer: song.singer });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getMood = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.songId);
//     if (!song) return res.status(404).json({ message: 'Song not found' });
//     res.status(200).json({ mood: song.mood });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getGenre = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.songId);
//     if (!song) return res.status(404).json({ message: 'Song not found' });
//     res.status(200).json({ genre: song.genre });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getMovie = async (req, res) => {
//   try {
//     const song = await Song.findById(req.params.songId);
//     if (!song) return res.status(404).json({ message: 'Song not found' });
//     res.status(200).json({ movie: song.movie });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Exporting all handlers
// module.exports = {
//   uploadSong,
//   getSongs,
//   updateSong,
//   replaceAudio,
//   replaceThumbnail,
//   deleteSong,
//   getRecommendations,
//   getSongName,
//   getSingerName,
//   getMood,
//   getGenre,
//   getMovie,
// // };
// const Fuse = require('fuse.js');
// const Song = require('../models/Song');
// const User = require('../models/User');

// // const cloudinary = require('../config/cloudinary'); // Keep this commented if not used here

// const uploadSong = async (req, res) => {
//     console.log('Request body:', req.body);
//     console.log('Request files:', req.files);

//     try {
//         const { title, description, singer, mood, movie, genre, duration } = req.body;
//         if (!title || !singer || !genre || !duration) {
//             return res.status(400).json({ message: 'Missing required fields' });
//         }

//         if (!req.files || !req.files.audio || !req.files.thumbnail) {
//             return res.status(400).json({ message: 'Audio and thumbnail files are required' });
//         }

//         const audio = req.files.audio[0];
//         const thumbnail = req.files.thumbnail[0];

//         // Ensure global.cloudinary is defined elsewhere in your app setup
//         const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//         const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);

//         const song = new Song({
//             title,
//             description: description || '',
//             singer,
//             mood,
//             movie,
//             genre,
//             duration: parseInt(duration),
//             audioUrl: audioUpload.secure_url,
//             thumbnailUrl: thumbnailUpload.secure_url,
//             uploadedBy: req.user.id,
//         });

//         await song.save();
//         res.status(201).json(song);
//     } catch (error) {
//         console.error('Upload error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// // In controllers/songController.js
// const getSongs = async (req, res) => {
//     const { mood, singer, movie, genre, search } = req.query;
//     let filters = {};

//     if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };

//     if (singer) {
//         // Option 1A: Match the beginning of the singer's name (case-insensitive)
//         // This would match 'kk' with 'KK', 'KK Singh', but not 'Neha Kakkar'
//         // filters.singer = { $regex: new RegExp(`^${singer.trim()}`, 'i') };

//         // Option 1B: Match the singer's name as a whole word (more robust)
//         // This is often the best balance for dedicated singer pages.
//         // It uses word boundaries (\b) to ensure 'kk' isn't just a substring of another word.
//         // It would match "KK", "KK Singh", but not "Neha Kakkar"
//         filters.singer = { $regex: new RegExp(`\\b${singer.trim()}\\b`, 'i') };
//     }

//     if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
//     if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

//     console.log('Backend: getSongs - Applied filters (without search):', filters);

//     try {
//         let songs = await Song.find(filters); 
        
//         if (search) {
//             const options = {
//                 keys: ['title', 'singer', 'mood', 'movie', 'genre'],
//                 threshold: 0.4,
//                 distance: 100,
//             };

//             const fuse = new Fuse(songs, options);
//             const result = fuse.search(search);

//             songs = result.map(r => r.item);
//         }

//         console.log('Backend: getSongs - Found songs:', songs.length);
//         res.json(songs);
//     } catch (error) {
//         console.error('Get songs error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const updateSong = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) {
//             return res.status(404).json({ message: 'Song not found' });
//         }

//         const { title, description, singer, mood, movie, genre, duration } = req.body;
//         song.title = title || song.title;
//         song.description = description || song.description;
//         song.singer = singer || song.singer;
//         song.mood = mood || song.mood;
//         song.movie = movie || song.movie;
//         song.genre = genre || song.genre;
//         song.duration = duration || song.duration;

//         await song.save();
//         res.json(song);
//     } catch (error) {
//         console.error('Update song error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const replaceAudio = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) {
//             return res.status(404).json({ message: 'Song not found' });
//         }

//         if (!req.files || !req.files.audio) { // Note: multer upload.single('audio') typically puts file on req.file
//             return res.status(400).json({ message: 'Audio file is required' });
//         }
        
//         // Correct way to access file with upload.single: req.file
//         const audio = req.file; 
//         if (!audio) {
//             return res.status(400).json({ message: 'Audio file is required (from req.file)' });
//         }

//         const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
//         song.audioUrl = audioUpload.secure_url;

//         await song.save();
//         res.json(song);
//     } catch (error) {
//         console.error('Replace audio error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const replaceThumbnail = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) {
//             return res.status(404).json({ message: 'Song not found' });
//         }

//         // Change here: check req.file instead of req.files.thumbnail
//         if (!req.file) {
//             return res.status(400).json({ message: 'Thumbnail file is required' });
//         }

//         const thumbnail = req.file;
//         const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);
//         song.thumbnailUrl = thumbnailUpload.secure_url;

//         await song.save();
//         res.json(song);
//     } catch (error) {
//         console.error('Replace thumbnail error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const deleteSong = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) {
//             return res.status(404).json({ message: 'Song not found' });
//         }

//         // Important: Use findByIdAndDelete() or findOneAndDelete()
//         // `remove()` is deprecated in newer Mongoose versions
//         await Song.findByIdAndDelete(req.params.id); 
//         res.json({ message: 'Song deleted successfully' });
//     } catch (error) {
//         console.error('Delete song error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getRecommendations = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const { singers, moods, genres } = user.interests;

//         const recommendedSongs = await Song.find({
//             $or: [
//                 { singer: { $in: singers } },
//                 { mood: { $in: moods } },
//                 { genre: { $in: genres } },
//             ],
//         }).limit(10); // Limiting to 10 recommendations

//         res.json(recommendedSongs);
//     } catch (error) {
//         console.error('Get recommendations error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getSongName = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.songId);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.status(200).json({ name: song.title });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getSingerName = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.songId);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.status(200).json({ singer: song.singer });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getMood = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.songId);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.status(200).json({ mood: song.mood });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getGenre = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.songId);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.status(200).json({ genre: song.genre });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const getMovie = async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.songId);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.status(200).json({ movie: song.movie });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// // Exporting all handlers
// module.exports = {
//     uploadSong,
//     getSongs,
//     updateSong,
//     replaceAudio,
//     replaceThumbnail,
//     deleteSong,
//     getRecommendations,
//     getSongName,
//     getSingerName,
//     getMood,
//     getGenre,
//     getMovie,
// };


const Fuse = require('fuse.js');
const Song = require('../models/Song');
const User = require('../models/User');

// const cloudinary = require('../config/cloudinary'); // Keep this commented if not used here

const uploadSong = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    try {
        const { title, description, singer, mood, movie, genre, duration } = req.body;
        if (!title || !singer || !genre || !duration) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        if (!req.files || !req.files.audio || !req.files.thumbnail) {
            return res.status(400).json({ message: 'Audio and thumbnail files are required' });
        }

        const audio = req.files.audio[0];
        const thumbnail = req.files.thumbnail[0];

        // Ensure global.cloudinary is defined elsewhere in your app setup
        const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
        const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);

        const song = new Song({
            title,
            description: description || '',
            singer,
            mood,
            movie,
            genre,
            duration: parseInt(duration),
            audioUrl: audioUpload.secure_url,
            thumbnailUrl: thumbnailUpload.secure_url,
            uploadedBy: req.user.id,
        });

        await song.save();
        res.status(201).json(song);
    } catch (error) {
        console.error('Upload error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// In controllers/songController.js
const getSongs = async (req, res) => {
    const { mood, singer, movie, genre, search } = req.query;
    let filters = {};

    if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };

    if (singer) {
        // Option 1A: Match the beginning of the singer's name (case-insensitive)
        // This would match 'kk' with 'KK', 'KK Singh', but not 'Neha Kakkar'
        // filters.singer = { $regex: new RegExp(`^${singer.trim()}`, 'i') };

        // Option 1B: Match the singer's name as a whole word (more robust)
        // This is often the best balance for dedicated singer pages.
        // It uses word boundaries (\b) to ensure 'kk' isn't just a substring of another word.
        // It would match "KK", "KK Singh", but not "Neha Kakkar"
        filters.singer = { $regex: new RegExp(`\\b${singer.trim()}\\b`, 'i') };
    }

    if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
    if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

    console.log('Backend: getSongs - Applied filters (without search):', filters);

    try {
        let songs = await Song.find(filters); 
        
        if (search) {
            const options = {
                keys: ['title', 'singer', 'mood', 'movie', 'genre'],
                threshold: 0.4,
                distance: 100,
            };

            const fuse = new Fuse(songs, options);
            const result = fuse.search(search);

            songs = result.map(r => r.item);
        }

        console.log('Backend: getSongs - Found songs:', songs.length);
        res.json(songs);
    } catch (error) {
        console.error('Get songs error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        const { title, description, singer, mood, movie, genre, duration } = req.body;
        song.title = title || song.title;
        song.description = description || song.description;
        song.singer = singer || song.singer;
        song.mood = mood || song.mood;
        song.movie = movie || song.movie;
        song.genre = genre || song.genre;
        song.duration = duration || song.duration;

        await song.save();
        res.json(song);
    } catch (error) {
        console.error('Update song error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const replaceAudio = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        if (!req.files || !req.files.audio) { // Note: multer upload.single('audio') typically puts file on req.file
            return res.status(400).json({ message: 'Audio file is required' });
        }
        
        // Correct way to access file with upload.single: req.file
        const audio = req.file; 
        if (!audio) {
            return res.status(400).json({ message: 'Audio file is required (from req.file)' });
        }

        const audioUpload = await global.cloudinary.uploader.upload(audio.path, { resource_type: 'video' });
        song.audioUrl = audioUpload.secure_url;

        await song.save();
        res.json(song);
    } catch (error) {
        console.error('Replace audio error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const replaceThumbnail = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        // Change here: check req.file instead of req.files.thumbnail
        if (!req.file) {
            return res.status(400).json({ message: 'Thumbnail file is required' });
        }

        const thumbnail = req.file;
        const thumbnailUpload = await global.cloudinary.uploader.upload(thumbnail.path);
        song.thumbnailUrl = thumbnailUpload.secure_url;

        await song.save();
        res.json(song);
    } catch (error) {
        console.error('Replace thumbnail error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        // Important: Use findByIdAndDelete() or findOneAndDelete()
        // `remove()` is deprecated in newer Mongoose versions
        await Song.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        console.error('Delete song error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getRecommendations = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { singers, moods, genres } = user.interests;

        const recommendedSongs = await Song.find({
            $or: [
                { singer: { $in: singers } },
                { mood: { $in: moods } },
                { genre: { $in: genres } },
            ],
        }).limit(10); // Limiting to 10 recommendations

        res.json(recommendedSongs);
    } catch (error) {
        console.error('Get recommendations error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getSongName = async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ name: song.title });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getSingerName = async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ singer: song.singer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMood = async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ mood: song.mood });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getGenre = async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ genre: song.genre });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMovie = async (req, res) => {
    try {
        const song = await Song.findById(req.params.songId);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.status(200).json({ movie: song.movie });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const updateSongTitle = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { title } = req.body;
        if (!title) return res.status(400).json({ message: 'Title is required' });

        song.title = title;
        await song.save();

        res.json({ message: 'Title updated successfully', song });
    } catch (error) {
        console.error('Update title error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSongSinger = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { singer } = req.body;
        if (!singer) return res.status(400).json({ message: 'Singer is required' });

        song.singer = singer;
        await song.save();

        res.json({ message: 'Singer updated successfully', song });
    } catch (error) {
        console.error('Update singer error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSongMood = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { mood } = req.body;
        if (!mood) return res.status(400).json({ message: 'Mood is required' });

        song.mood = mood;
        await song.save();

        res.json({ message: 'Mood updated successfully', song });
    } catch (error) {
        console.error('Update mood error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSongMovie = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { movie } = req.body;
        if (!movie) return res.status(400).json({ message: 'Movie is required' });

        song.movie = movie;
        await song.save();

        res.json({ message: 'Movie updated successfully', song });
    } catch (error) {
        console.error('Update movie error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSongGenre = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { genre } = req.body;
        if (!genre) return res.status(400).json({ message: 'Genre is required' });

        song.genre = genre;
        await song.save();

        res.json({ message: 'Genre updated successfully', song });
    } catch (error) {
        console.error('Update genre error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateSongDuration = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });

        const { duration } = req.body;
        if (!duration) return res.status(400).json({ message: 'Duration is required' });

        song.duration = duration;
        await song.save();

        res.json({ message: 'Duration updated successfully', song });
    } catch (error) {
        console.error('Update duration error:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports = {
    uploadSong,
    getSongs,
    updateSong,
    replaceAudio,
    replaceThumbnail,
    deleteSong,
    getRecommendations,
    getSongName,
    getSingerName,
    getMood,
    getGenre,
    getMovie,
    updateSongTitle,
    updateSongSinger,
    updateSongMood,
    updateSongMovie,
    updateSongGenre,
    updateSongDuration
};
