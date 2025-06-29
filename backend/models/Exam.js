const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    title: String,
    subject: String,
    instructor: String,
    venue: String,
    date: String,
    time: String,
    duration: Number,
    marks: Number,
    noOfStudents: Number,
    status: String
})

module.exports = mongoose.model('Exam', examSchema);