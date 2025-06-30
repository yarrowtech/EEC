const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');


router.get('/fetch', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch(err) {
        res.status(500).json({
            message: 'Error fetching feedback'})
    }
})

router.post("/add", async (req, res) => {
    const { userType, name, schoolName, mobile, rating, comment } = req.body;

    if (!userType || !name || !schoolName || !mobile || !rating || !comment) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newFeedback = new Feedback({
            userType,
            name,
            schoolName,
            mobile,
            rating,
            comment
        });

        await newFeedback.save();
        res.status(201).json({ message: 'Feedback added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding feedback' });
    }
})

module.exports = router;