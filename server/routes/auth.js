// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Убедись, что JWT_SECRET задан
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    console.log('Register attempt:', { username, email });

    // Проверка существования пользователя
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email 
          ? 'Email already exists' 
          : 'Username already taken'
      });
    }

    const user = new User({
      username,
      email,
      password,
      fullName: fullName || username
    });

    await user.save();

    // Создаем токен с ФИКСИРОВАННЫМ секретом
    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Token created with secret:', JWT_SECRET.substring(0, 10) + '...');

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        followersCount: user.followersCount,
        followingCount: user.followingCount,
        postsCount: user.postsCount,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// routes/auth.js (фрагмент логина)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Создаем токен
    const token = jwt.sign(
      { userId: user._id.toString() }, // Убедимся, что передаем строку
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Token created:', {
      userId: user._id.toString(),
      tokenPreview: token.substring(0, 30) + '...'
    });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        followersCount: user.followersCount,
        followingCount: user.followingCount,
        postsCount: user.postsCount,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;