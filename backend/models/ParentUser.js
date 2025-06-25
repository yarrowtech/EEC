const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const parentUserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,

   mobile: String,
  email: String,
  city: String,
  address: String,
  state: String,
  pinCode: String,
});

parentUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('ParentUser', parentUserSchema);
