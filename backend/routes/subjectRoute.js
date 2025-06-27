const express = require('express');
const Subject = require('../models/Subject');
const adminAuth = require('../middleware/adminAuth');




const router = express.Router();


router.get("/fetch", adminAuth, async (req, res) => {
    try {
        const subjects = await Subject.find()
        res.status(200).json(subjects);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

router.post("/add", adminAuth, async (req, res) => {
    try {
        const { subjectName, grade, teachers, totalStudents, hoursPerWeek } = req.body;
        const teacher = teachers.split(",").map(teacher => teacher.trim());
        const subject = new Subject({
            subjectName,
            grade,
            teachers: teacher,
            totalStudents,
            hoursPerWeek
        });
        await subject.save();
        res.status(201).json({message: "Subject added successfully"});
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

module.exports = router;