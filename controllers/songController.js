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


const Fuse = require('fuse.js');
const Song = require('../models/Song');
const User = require('../models/User');

// const cloudinary = require('../config/cloudinary');

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


// const getSongs = async (req, res) => {
//   const { mood, singer, movie, genre, search } = req.query;
//   let filters = {};

//   // Add filters for mood, singer, movie, genre
//   if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
//   if (singer) filters.singer = { $regex: new RegExp(singer, 'i') };
//   if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
//   if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

//   console.log('Applied filters (without search):', filters);

//   try {
//     let songs = await Song.find(filters); 
//     // If user entered search text, apply fuzzy search
//     if (search) {
//       const options = {
//         keys: ['title', 'singer', 'mood', 'movie', 'genre'], // fields to search
//         threshold: 0.4, // how fuzzy (0 = strict, 1 = very fuzzy)
//         distance: 100,  // max distance for fuzzy match
//       };

//       const fuse = new Fuse(songs, options);
//       const result = fuse.search(search);

//       // Map result back to actual song objects
//       songs = result.map(r => r.item);
//     }

//     console.log('Found songs:', songs.length);
//     res.json(songs);
//   } catch (error) {
//     console.error('Get songs error:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const getSongs = async (req, res) => {
  const { mood, singer, movie, genre, search } = req.query;
  let filters = {};

  // Add filters for mood, singer, movie, genre
  if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
  // Exact, case-insensitive match for singer
  if (singer) filters.singer = { $regex: new RegExp(`^${singer.trim()}$`, 'i') };
  if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
  if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };

  console.log('Applied filters (without search):', filters);

  try {
    let songs = await Song.find(filters); 
    // If user entered search text, apply fuzzy search
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

    console.log('Found songs:', songs.length);
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

    if (!req.files || !req.files.audio) {
      return res.status(400).json({ message: 'Audio file is required' });
    }

    const audio = req.files.audio[0];
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

    await song.remove();
    res.json({ message: 'Song deleted' });
  } catch (error) {
    console.error('Delete song error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { singers, moods, genres } = user.interests;

    const recommendedSongs = await Song.find({
      $or: [
        { singer: { $in: singers } },
        { mood: { $in: moods } },
        { genre: { $in: genres } },
      ],
    }).limit(10);

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
    res.status(500).json({ message: 'Server error' });
  }
};

const getSingerName = async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.status(200).json({ singer: song.singer });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMood = async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.status(200).json({ mood: song.mood });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getGenre = async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.status(200).json({ genre: song.genre });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMovie = async (req, res) => {
  try {
    const song = await Song.findById(req.params.songId);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.status(200).json({ movie: song.movie });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Exporting all handlers
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
};
