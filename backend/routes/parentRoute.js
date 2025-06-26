const express = require('express');
const router = express.Router();
const ParentUser = require('../models/ParentUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');
const { generateUsername, generatePassword } = require('../utils/generator');

// Parent Registration
router.post('/register', adminAuth, async (req, res) => {
  const {
    name,
    mobile,
    email,
    children,
    grade,
  } = req.body;

  try {
    const username = await generateUsername(name, 'parent');
    const password = generatePassword();
    const allChild = children.split(',').map(child => child.trim());
    const allGrade = grade.split(',').map(g => g.trim());
    const user = new ParentUser({
      username,
      password,
      name,
      mobile,
      email,
      children: allChild,
      grade: allGrade,
    });

    await user.save();
    res.status(201).json({ message: 'Parent registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Parent Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await ParentUser.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, userType: 'parent' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
