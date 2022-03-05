const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    description: {
        type: String
    },
    value: {
        type: String,
        required: [true, 'Value is required']
    }
});

module.exports = mongoose.model('Setting', SettingSchema);