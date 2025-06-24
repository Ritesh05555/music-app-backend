const express = require('express');
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);

module.exports = router;