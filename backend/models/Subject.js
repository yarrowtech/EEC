const mongoose = require("mongoose")


const subjectSchema = new mongoose.Schema({
    subjectName: String,
    grade: String,
    teachers: [String],
    totalStudents: Number,
    hoursPerWeek: Number
})

module.exports = mongoose.model("Subject", subjectSchema)