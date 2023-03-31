const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true
    },
    album: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Review', reviewSchema)