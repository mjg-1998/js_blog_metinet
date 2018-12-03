const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        empty: false
    },
    gender: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    empire: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    mainGroup: {
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

characterSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
});

mongoose.model('Character', characterSchema);