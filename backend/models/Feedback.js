const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    userType: String,
    name: String,
    schoolName: String,
    mobile: String,
    rating: Number,
    comment: String
})

module.exports = mongoose.model('Feedback', feedbackSchema);