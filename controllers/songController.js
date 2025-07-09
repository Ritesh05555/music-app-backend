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



const uploadSong = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    try {
        const { title, description, singer, mood, movie, genre, duration, language } = req.body;
        if (!title || !singer || !genre || !duration || !language) {
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
            language, // ✅ Save language
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
//     const { mood, singer, movie, genre, search, language } = req.query;
//     let filters = {};

//     if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
//     if (singer) filters.singer = { $regex: new RegExp(`\\b${singer.trim()}\\b`, 'i') };
//     if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
//     if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };
//     if (language) {
//         filters.language = { $regex: `^${language}$`, $options: 'i' }; // Case-insensitive exact match
//     }

//     console.log('Applied filters:', filters);

//     try {
//         let songs = await Song.find(filters);
//         console.log('Found songs count (before Fuse):', songs.length);

//         // Apply Fuse search if "search" query param exists
//         if (search) {
//             const fuse = new Fuse(songs, {
//                 keys: ['title', 'singer', 'mood', 'movie', 'genre', 'language'],
//                 threshold: 0.4,
//                 distance: 100,
//             });

//             const fuseResults = fuse.search(search);
//             songs = fuseResults.map(r => r.item);
//             console.log('Found songs count (after Fuse):', songs.length);
//         }

//         res.json(songs);
//     } catch (error) {
//         console.error('Get songs error:', error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

const getSongs = async (req, res) => {
    let { mood, singer, movie, genre, search, language, title } = req.query;
    let filters = {};
    let initialSearchTerm = search ? search.toLowerCase() : ''; // Store original search for fallback

    // --- Define your known categories strictly from the UI ---
    const knownMoods = ['happy', 'sad', 'love', 'motivational', 'nostalgic', 'heartbreak', 'spiritual', 'travel'];
    const knownGenres = ['rap', 'classical', 'party', 'lofi', 'pop', 'rock', 'hip hop', 'devotional', 'bollywood']; // Add any other genres you have
    const knownLanguages = ['punjabi', 'hindi', 'english', 'tamil', 'telugu', 'malayalam']; // Add more as per your data

    // --- Step 1: Strict Keyword Extraction for Mood, Genre, Language ---
    // Prioritize mood, then genre, then language if found directly in the search input
    let foundStrictFilter = false;

    // Check for Mood first
    if (!mood && initialSearchTerm) { // Only if mood isn't already set by a direct query param
        for (const m of knownMoods) {
            // Use word boundary to match whole words. Handle multi-word moods like "heartbreak"
            const regex = new RegExp(`\\b${m.replace(/\s+/g, '\\s+')}\\b`, 'i');
            if (initialSearchTerm.match(regex)) {
                filters.mood = { $regex: new RegExp(m, 'i') };
                foundStrictFilter = true;
                console.log(`Strictly extracted mood: ${m}`);
                break; // Stop after finding the first mood match
            }
        }
    }

    // Check for Genre second (only if mood wasn't the strict match, or if mood was set separately)
    if (!genre && initialSearchTerm && !foundStrictFilter) { // Only try to find genre strictly if no mood was the primary strict filter
        for (const g of knownGenres) {
            const regex = new RegExp(`\\b${g.replace(/\s+/g, '\\s+')}\\b`, 'i');
            if (initialSearchTerm.match(regex)) {
                filters.genre = { $regex: new RegExp(g, 'i') };
                foundStrictFilter = true;
                console.log(`Strictly extracted genre: ${g}`);
                break;
            }
        }
    }

    // Check for Language third (only if mood/genre weren't the strict match)
    if (!language && initialSearchTerm && !foundStrictFilter) {
        for (const l of knownLanguages) {
            const regex = new RegExp(`\\b${l.replace(/\s+/g, '\\s+')}\\b`, 'i');
            if (initialSearchTerm.match(regex)) {
                filters.language = { $regex: new RegExp(l, 'i') };
                foundStrictFilter = true;
                console.log(`Strictly extracted language: ${l}`);
                break;
            }
        }
    }

    // Apply any directly provided query parameters (they override strict search extraction)
    if (mood) filters.mood = { $regex: new RegExp(mood, 'i') };
    if (singer) filters.singer = { $regex: new RegExp(`\\b${singer.trim()}\\b`, 'i') };
    if (movie) filters.movie = { $regex: new RegExp(movie, 'i') };
    if (genre) filters.genre = { $regex: new RegExp(genre, 'i') };
    if (language) {
        filters.language = { $regex: `^${language}$`, $options: 'i' };
    }
    if (title) filters.title = { $regex: new RegExp(title, 'i') };

    console.log('Applied strict filters:', filters);

    try {
        // --- Step 2: Initial MongoDB Query with Strict Filters ---
        let songs = await Song.find(filters);
        console.log('Found songs count (initial MongoDB with strict filters):', songs.length);

        // --- Step 3: Return immediately if strict filter yields results ---
        if (songs.length > 0 && foundStrictFilter) {
            // If we found a strict filter (mood, genre, or language from 'search')
            // AND we got results, return them. This prevents mixing.
            res.json(songs);
            return; // IMPORTANT: Stop execution here
        }

        // --- Step 4: Fallback to General Fuse Search if no strict matches or no results ---
        // This means either:
        // a) No mood, genre, or language was strictly identified from the 'search' input (e.g., "Shape of You", "random song")
        // b) A strict filter was identified, but it yielded 0 results.
        if (initialSearchTerm) { // Only run Fuse if there's a search term
            console.log('Falling back to general Fuse search...');
            
            // For Fuse, we need a pool of songs to search within.
            // If the strict filter already returned songs, Fuse should operate on those.
            // If the strict filter returned 0 songs, Fuse should operate on ALL songs.
            let songsForFuse = songs; // Start with results from strict MongoDB query
            if (songs.length === 0 && Object.keys(filters).length === 0) {
                 // No strict filters were applied (e.g., query was just "song name") AND initial result is empty
                 songsForFuse = await Song.find({}); // Fetch ALL songs
                 console.log('Fuse searching across all songs.');
            } else if (songs.length === 0 && Object.keys(filters).length > 0) {
                // Strict filters were applied but returned 0 results. Broaden scope for Fuse.
                songsForFuse = await Song.find({}); // Fetch ALL songs for Fuse to search
                console.log('Strict filters returned 0 results, Fuse searching across all songs.');
            }


            if (songsForFuse.length > 0) { // Ensure there are songs to search within
                const searchTerms = initialSearchTerm.split(/\s+/).filter(term => term !== '');

                const fuse = new Fuse(songsForFuse, {
                    keys: ['title', 'singer', 'mood', 'movie', 'genre', 'language'],
                    threshold: 0.3, // Make this a bit stricter for better initial quality
                    distance: 100,
                    ignoreLocation: true,
                    includeScore: true // Include score to potentially refine sorting if needed later
                });

                let combinedResults = new Map();
                searchTerms.forEach(term => {
                    fuse.search(term).forEach(r => {
                        // For the fallback, Fuse results are the primary source
                        combinedResults.set(r.item._id.toString(), r.item);
                    });
                });

                songs = Array.from(combinedResults.values());
                console.log('Found songs count (after general Fuse):', songs.length);
            } else {
                songs = []; // No songs available for Fuse to search
            }
        }

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
const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
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
        await song.save({ validateModifiedOnly: true });

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
        await song.save({ validateModifiedOnly: true });

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
        await song.save({ validateModifiedOnly: true });

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
        await song.save({ validateModifiedOnly: true });

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
        await song.save({ validateModifiedOnly: true });

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
        await song.save({ validateModifiedOnly: true });

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
    getSongById,
    getGenre,
    getMovie,
    updateSongTitle,
    updateSongSinger,
    updateSongMood,
    updateSongMovie,
    updateSongGenre,
    updateSongDuration
};
