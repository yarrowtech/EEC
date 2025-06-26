const express = require('express');
const router = express.Router();
const StudentUser = require('../models/StudentUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const { generateUsername, generatePassword } = require('../utils/generator');

// Register Student
router.post('/register', adminAuth, async (req, res) => {
  const {
    name,
    grade,
    section,
    roll,
    gender,
    dob,
    mobile,
    email,
    address,
    pinCode,
  } = req.body

  try {
    const username = await generateUsername(name, 'student');
    const password = generatePassword();
    const user = new StudentUser({
      username, password,
      name,
      grade,
      section,
      roll,
      gender,
      dob,
      mobile,
      email,
      address,
      pinCode,
    });

    await user.save();
    res.status(201).json({ message: 'Student registered successfully', username, password });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login Student
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await StudentUser.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, userType: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
