const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    response: {
        type: String,
        // enum: ['a', 'b', 'c', 'd'],
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
});

const responseSchema = mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    answers: {
        type: [answerSchema],
        default: []
    },
    score: {
        type: Number,
        default: 0
    },
    evaluated: {
        type: Boolean,
        deafult: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Response', responseSchema);