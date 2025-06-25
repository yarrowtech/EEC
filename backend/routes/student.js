const express = require('express');
const router = express.Router();
const StudentUser = require('../models/StudentUser');
const auth = require('../middleware/authStudent');
const multer = require('multer');

// Setup multer for file uploads (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST request to update student profile
router.post('/profile/update', auth, upload.single('profilePic'), async (req, res) => {
  try {
    const updates = req.body;

    // Handle profilePic if included
    if (req.file) {
      updates.profilePic = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const updatedStudent = await StudentUser.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({ message: 'Profile updated successfully', student: updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const student = await StudentUser.findById(req.user.id).select('-password');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
