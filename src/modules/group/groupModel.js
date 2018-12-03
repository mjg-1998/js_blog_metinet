const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
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

    creationDate: {
        type: Date,
        default: Date.now
    },

    lastUpdate: {
        type: Date,
        default: Date.now
    }
});

groupSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
});

mongoose.model('Group', groupSchema);
