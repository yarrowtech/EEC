const express = require('express');
const router = express.Router();
const StudentUser = require('../models/StudentUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminAuth = require('../middleware/adminAuth');

/**
 * Generates a random username based on student name
 * @param {string} name - Student's full name
 * @returns {string} - Generated username
 */
const generateUsername = async (name) => {
  // Remove spaces and convert to lowercase
  const baseName = name.replace(/\s+/g, '').toLowerCase();
  
  // Take the first 6 characters or the entire name if shorter
  const namePrefix = baseName.substring(0, Math.min(6, baseName.length));
  
  // Add random 4-digit number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  
  const username = `${namePrefix}${randomNum}`;
  
  // Check if username already exists
  const existingUser = await StudentUser.findOne({ username });
  if (existingUser) {
    // If username exists, try again with a different number
    return generateUsername(name);
  }
  
  return username;
};

/**
 * Generates a random secure password
 * @param {number} length - Length of password (default: 10)
 * @returns {string} - Generated password
 */
const generatePassword = (length = 10) => {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghijkmnpqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '@#$%&*!';
  
  const allChars = uppercase + lowercase + numbers + symbols;
  
  let password = '';
  
  // Ensure at least one character from each type
  password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
  password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
  password += numbers.charAt(Math.floor(Math.random() * numbers.length));
  password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  
  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password characters
  return password.split('').sort(() => 0.5 - Math.random()).join('');
};

// Register Student
router.post('/register', adminAuth, async (req, res) => {
  const {
    name,
    grade,
    section,
    gender,
    dob,
    mobile,
    email,
    address,
    pinCode,
  } = req.body

  try {
    const username = await generateUsername(name);
    const password = generatePassword();
    const user = new StudentUser({
      username, password,
       name,
    grade,
    section,
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
