const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Register
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;
  try {
    const admin = new Admin({ username, password, name });
    await admin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin._id, type: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
