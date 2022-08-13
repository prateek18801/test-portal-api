const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: Number,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    extra: {
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        type: String,
        required: true
    },
    contributors: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);