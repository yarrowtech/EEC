const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');


router.get("/fetch", async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch(err) {
        res.status(500).json({ error: "Internal server error" });
    }
})
router.post("/add", async (req, res) => {
    try {
        const { title, subject, class: className, marks, dueDate } = req.body;
        const assignment = new Assignment({
            title,
            subject,
            class: className,
            marks,
            dueDate
        });
        await assignment.save();
        res.status(201).json({ message: "Assignment created successfully", assignment });
    } catch(err) {
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;