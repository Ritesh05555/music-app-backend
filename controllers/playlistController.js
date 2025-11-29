const Playlist = require('../models/Playlist');
const mongoose = require('mongoose'); 

const createPlaylist = async (req, res) => {
    const { name } = req.body;

    try {
        const playlist = new Playlist({
            userId: req.user.id,
            name,
            items: [],
        });

        await playlist.save();
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.user.id })
            .populate('items.itemRef');
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
            .populate('items.itemRef');
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

const addItemToPlaylist = async (req, res) => {
    const { itemType, itemRef } = req.body;
    const playlistId = req.params.id; // Get playlist ID from params

    // Basic validation for itemType (already present, but good to check)
    if (!['Song', 'OTS', 'LifeLesson'].includes(itemType)) {
        return res.status(400).json({ message: 'Invalid itemType. Must be Song, OTS, or LifeLesson.' });
    }

    // Add more specific validation for itemRef if it's not a valid ObjectId format
    // Although Mongoose will likely catch this, an early check can provide clearer errors.
    if (!mongoose.Types.ObjectId.isValid(itemRef)) { // <--- This line needs mongoose
        return res.status(400).json({ message: 'Invalid itemRef format. Must be a valid MongoDB ObjectId.' });
    }

    try {
        const playlist = await Playlist.findById(playlistId); // Use playlistId here
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        // Check ownership
        if (playlist.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied: You do not own this playlist.' });
        }

        // Check if the item already exists in the playlist to prevent duplicates (optional but good practice)
        const itemExists = playlist.items.some(
            (item) => item.itemRef && item.itemRef.toString() === itemRef && item.itemType === itemType
        );
        if (itemExists) {
            return res.status(409).json({ message: 'Item already exists in this playlist.' });
        }

        playlist.items.push({ itemType, itemRef });
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        // Log the actual error for debugging
        console.error('Error adding item to playlist:', error);
        // Send a more informative error message to the client
        res.status(500).json({
            message: 'Server error: Failed to add item to playlist.',
            error: error.message // Include the specific error message
        });
    }
};

const removeItemFromPlaylist = async (req, res) => {
    const { playlistId, itemId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        if (playlist.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        playlist.items = playlist.items.filter(
            (item) => item._id.toString() !== itemId
        );
        await playlist.save();

        res.json({ message: 'Item removed from playlist', playlist });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const playlist = await Playlist.findOneAndDelete({
            _id: id,
            userId: userId
        });

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found or not authorized' });
        }

        res.json({ message: 'Playlist deleted successfully', playlistId: id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE your module.exports to include it:
module.exports = {
    createPlaylist,
    getPlaylists,
    getPlaylistById,
    addItemToPlaylist,
    removeItemFromPlaylist,
    deletePlaylist  // ADD THIS LINE
};