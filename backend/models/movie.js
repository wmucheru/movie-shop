const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required']
    },
    type: {
        type: String,
        enum: ['Regular', 'Children’s Movie', 'New Release'],
        required: [true, 'Movie type is required']
    },
    genre: {
        type: String,
        enum: ['Action', 'Drama', 'Romance', 'Comedy', 'Horror'],
        required: [true, 'Genre is required']
    },
    popularity: {
        type: Number,
        required: [true, 'Popularity is required'],
        min: 1,
        max: 5
    },

    // Optional fields
    maximumAge: {
        type: Number,
        required: function () {
            return this.type === 'Children’s Movie'
        }
    },
    yearReleased: {
        type: Number,
        required: function () {
            return this.type === 'New Release'
        }
    }
});

module.exports = mongoose.model('Movie', MovieSchema);