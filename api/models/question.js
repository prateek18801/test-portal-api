const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    serial: {
        type: Number,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'image', 'video', 'audio', 'link', 'frame'],
        default: 'text'
    },
    url: {
        type: String
    },
    a: {
        type: String,
        required: true
    },
    b: {
        type: String,
        required: true
    },
    c: {
        type: String,
        required: true
    },
    d: {
        type: String,
        required: true
    },
    key: {
        type: String,
        enum: ['a', 'b', 'c', 'd', 'text'],
        required: true
    },
    options: {
        type: Boolean,
        default: true
    },
    positive: {
        type: Number,
        default: 1
    },
    negative: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);