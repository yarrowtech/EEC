const express = require('express');
const router = express.Router();
const Behaviour = require('../models/Behaviour');


router.post('/submit', async (req, res) => {
    try {
        const { studentClass, subject, questionType, startTime, endTime, correct, incorrect } = req.body;
        const behaviourData = new Behaviour({
            studentClass,
            subject,
            questionType,
            startTime,
            endTime,
            correct,
            incorrect
        });
        await behaviourData.save();
        res.status(201).json({ message: 'Behaviour data saved successfully' });
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;