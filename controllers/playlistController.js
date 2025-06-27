// const Playlist = require('../models/Playlist');

// const createPlaylist = async (req, res) => {
//   const { name } = req.body;

//   try {
//     const playlist = new Playlist({
//       userId: req.user.id,
//       name,
//       songs: [],
//     });

//     await playlist.save();
//     res.status(201).json(playlist);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const getPlaylists = async (req, res) => {
//   try {
//     const playlists = await Playlist.find({ userId: req.user.id }).populate('songs');
//     res.json(playlists);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const updatePlaylist = async (req, res) => {
//   const { name, songs } = req.body;

//   try {
//     const playlist = await Playlist.findById(req.params.id);
//     if (!playlist) {
//       return res.status(404).json({ message: 'Playlist not found' });
//     }

//     if (playlist.userId.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     playlist.name = name || playlist.name;
//     playlist.songs = songs || playlist.songs;

//     await playlist.save();
//     res.json(playlist);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// const deletePlaylist = async (req, res) => {
//   try {
//     const playlist = await Playlist.findById(req.params.id);
//     if (!playlist) {
//       return res.status(404).json({ message: 'Playlist not found' });
//     }

//     if (playlist.userId.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     await playlist.remove();
//     res.json({ message: 'Playlist deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = { createPlaylist, getPlaylists, updatePlaylist, deletePlaylist };



const Playlist = require('../models/Playlist');

const createPlaylist = async (req, res) => {
  const { name } = req.body;

  try {
    const playlist = new Playlist({
      userId: req.user.id,
      name,
      songs: [],
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



const updatePlaylist = async (req, res) => {
  const { name, songs } = req.body;

  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    playlist.name = name || playlist.name;
    playlist.songs = songs || playlist.songs;

    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await playlist.remove();
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  console.log('Attempting to delete song. Playlist ID:', playlistId, 'Song ID:', songId);

  try {
    const playlist = await Playlist.findById(playlistId);
    console.log('Found playlist:', playlist);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }

    if (playlist.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Remove the song ID from the songs array
    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();

    res.json({ message: 'Song removed from playlist', playlist });
  } catch (error) {
    console.error('Delete song from playlist error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createPlaylist, getPlaylists, getPlaylistById, updatePlaylist, deletePlaylist, deleteSongFromPlaylist };