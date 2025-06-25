const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  empId: Number,
  name: String,
  mobile: String,
  email: String,
  subject: String,
  department: String,
  qualification: String,
  experience: String,
  address: String,
  pinCode: String,
  profilePic: { type: String, default: "" },
});

teacherUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('TeacherUser', teacherUserSchema);
