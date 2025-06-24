const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../config/jwt');

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // Prevent admin registration via this route
  if (role === 'admin') {
    return res.status(403).json({ message: 'Admin registration not allowed' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await user.save();
    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user._id, fullName, email, role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, fullName: user.fullName, email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };