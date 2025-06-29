const express = require('express');
const Exam = require('../models/Exam');
const adminAuth = require('../middleware/adminAuth');




const router = express.Router();


router.get("/fetch", adminAuth, async (req, res) => {
    try {
        const subjects = await Exam.find()
        res.status(200).json(subjects);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

router.post("/add", adminAuth, async (req, res) => {
    try {
        const { title, subject, instructor, venue, date, time, duration, marks, noOfStudents, status } = req.body;
        const exam = new Exam({
            title,
            subject,
            instructor,
            venue,
            date,
            time,
            duration,
            marks,
            noOfStudents,
            status
        });
        await exam.save();
        res.status(201).json({message: "Exam added successfully"});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

module.exports = router;