const express = require('express');
const router = express.Router();
const TeacherUser = require('../models/TeacherUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Teacher
router.post('/register', async (req, res) => {
  const {
    username,
    password,
    name,
    mobile,
    email,
    city,
    address,
    state,
    pinCode
  } = req.body;

  try {
    const user = new TeacherUser({
      username,
      password,
      name,
      mobile,
      email,
      city,
      address,
      state,
      pinCode
    });

    await user.save();
    res.status(201).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Teacher
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await TeacherUser.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, userType: 'teacher' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;