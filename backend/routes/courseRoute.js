const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const Course = require("../models/Course")


router.post("/add", adminAuth, async (req, res) => {
    try {
        const { title, desc, department, instructor, duration, startingDate } = req.body
        const course = new Course({ title, desc, department, department, instructor, duration, startingDate })
        await course.save()
        res.status(201).json({message: "course created successfully"})
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

router.get("/fetch", adminAuth, async (req, res) => {
    try {
        const allCourses = await Course.find({})
        res.status(200).json(allCourses)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = router