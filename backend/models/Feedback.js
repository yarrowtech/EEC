const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
    role: String,
    name: String,
    schoolName: String,
    phone: String,
    rating: Number,
    feedback: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Feedback', feedbackSchema);