const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  department: String,
  desc: String,
  instructor: String,
  duration: String,
  startingDate: String,
  totalStudents: { type: Number, default: 0}
});

module.exports = mongoose.model("Course", courseSchema)