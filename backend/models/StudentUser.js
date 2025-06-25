// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const studentUserSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   name: String,

//    // Profile fields
// //   name: { type: String, required: true },
//   mobile: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   city: String,
//   address: String,
//   state: String,
//   pinCode: String,
// });



// studentUserSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// module.exports = mongoose.model('StudentUser', studentUserSchema);


const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], required: true },
  subject: { type: String }, // Optional, for subject-specific attendance
});

const studentUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  grade: String,
  section: String,
  gender: String,
  dob: String,
  mobile:  String,
  email: String,
  address: String,
  pinCode: String,
  profilePic: { type: String, default: "" },


  // Embedded attendance array
  attendance: [attendanceSchema],
});

studentUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('StudentUser', studentUserSchema);  