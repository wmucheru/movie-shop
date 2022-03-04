const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const TYPE_REGULAR = 'Regular';
const TYPE_CHILDRENS_MOVIE = 'Children’s Movie';
const TYPE_NEW_RELEASE = 'New Release';

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required']
    },
    type: {
        type: String,
        enum: [TYPE_REGULAR, TYPE_CHILDRENS_MOVIE, TYPE_NEW_RELEASE],
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
    rentalPrice: {
        type: Number,
        required: true,
        default: () => {

            switch (this.type) {
                case TYPE_CHILDRENS_MOVIE:
                    return 0.54;

                case TYPE_CHILDRENS_MOVIE:
                    return 1.50;

                default:
                    return 1;
            }
        }
    },

    // Optional fields
    maximumAge: {
        type: Number,
        required: function () {
            return this.type === TYPE_CHILDRENS_MOVIE
        }
    },
    releaseYear: {
        type: Number,
        required: function () {
            return this.type === 'New Release'
        }
    }
});

/**
 * 
 * Model functions
 * 
*/
MovieSchema.statics.fetchById = function (id) {
    return this.findOne({ _id: new ObjectId(id) });
}

MovieSchema.statics.deleteById = function (id) {
    return this.deleteOne({ _id: new ObjectId(id) });
}

module.exports = mongoose.model('Movie', MovieSchema);