const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const raceSchema = new Schema({
name: {
    type: String,
    required: true,
    empty: false,
    trim: true
},
    description: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    location: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },

    power: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },

    creationDate: {
        type: Date,
        default: Date.now
    },

    lastUpdate: {
        type: Date,
        default: Date.now
    }
});

raceSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
});

mongoose.model('Race', raceSchema);
