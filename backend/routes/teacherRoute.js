const express = require('express');
const router = express.Router();
const TeacherUser = require('../models/TeacherUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateUsername, generatePassword } = require('../utils/generator');
const adminAuth = require('../middleware/adminAuth');

// Register Teacher
router.post('/register', adminAuth, async (req, res) => {
  const {
    name,
    gender,
    mobile,
    email,
    subject,
    department,
    qualification,
    experience,
    address,
    pinCode,
    joiningDate
  } = req.body;

  try {

    const username = await generateUsername(name, "teacher")
    const password = generatePassword();
    const empId = await generateEmpId();

    const user = new TeacherUser({
      username,
      password,
      empId,
      name,
      gender,
      mobile,
      email,
      subject,
      department,
      qualification,
      experience,
      address,
      pinCode,
      joiningDate
    });

    await user.save();
    res.status(201).json({ message: 'Teacher registered successfully', username, password, empId });
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

/**
 * Generate a random empid
 * @returns {number} - Random 3-digit employee ID
 */
async function generateEmpId() {
  const num = Math.floor(Math.random() * 1000);
  const user = await TeacherUser.findOne({ empId: num });
  if (user) {
    return generateEmpId(); // Recursively generate a new ID if it already exists
  }
  return num;
}

module.exports = router;