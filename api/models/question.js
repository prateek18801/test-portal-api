const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    serial: {
        type: Number,
        required: true,
        unique: true
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
    answer: {
        type: String,
        enum: ['a', 'b', 'c', 'd', 'none'],
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
    }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);