const Test = require('../models/test');
const Question = require('../models/question');
const Response = require('../models/response');


exports.getTest = async (req, res, next) => {
    const _id = req.params.id;
    try {

        const data = _id ? await Test.findById(_id).populate('questions') : await Test.find({}).populate('questions');

        return res.status(200).json({
            message: 'success',
            data
        });

    } catch (error) {
        next(error);
    }
}

exports.postTest = async (req, res, next) => {
    const _id = req.params.id;

    const data = {
        ...req.body,
        code: req.body.code.toUpperCase(),
        duration: new Date(req.body.end) - new Date(req.body.start),
        // author: req.user.username
        author: 'prateek'
    };

    try {

        if (_id) {
            const existing = await Test.findById(_id);
            if (existing) {

                Object.keys(data).forEach(key => existing[key] = data[key]);

                const updated = await existing.save();
                return res.status(200).json({
                    message: 'upadated',
                    data: updated
                });
            }
        }

        const saved = await new Test({ ...data }).save();
        return res.status(201).json({
            message: 'created',
            data: saved
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteTest = async (req, res, next) => {
    const _id = req.params.id;
    try {

        const deleted = await Test.findByIdAndDelete(_id);

        return res.status(200).json({
            message: 'deleted',
            data: deleted
        });

    } catch (error) {
        next(error);
    }
}


exports.getQuestion = async (req, res, next) => {
    const _id = req.params.id;
    try {

        const data = await Question.findById(_id);

        return res.status(200).json({
            message: 'success',
            data
        });

    } catch (error) {
        next(error);
    }
}

exports.postQuestion = async (req, res, next) => {
    const _id = req.params.id;

    const data = {
        ...req.body,
        // author: req.user.username
        author: 'prateek'
    };

    try {

        const test = await Test.findById(data.testId);
        if (!test) {
            const error = new Error('invalid test id');
            error.code = 400;
            throw error;
        }

        if (_id) {
            const existing = await Question.findById(_id);
            if (existing) {

                Object.keys(data).forEach(key => existing[key] = data[key]);

                const updated = await existing.save();
                test.questions = appendUnique(test.questions, updated._id);
                await test.save();

                return res.status(200).json({
                    message: 'upadated',
                    data: updated
                });
            }
        }

        const saved = await new Question({ ...data }).save();

        test.questions = appendUnique(test.questions, saved._id);
        await test.save();

        return res.status(201).json({
            message: 'created',
            data: saved
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteQuestion = async (req, res, next) => {
    const _id = req.params.id;
    try {

        const deleted = await Question.findByIdAndDelete(_id);
        const test = await Test.findById(deleted.testId);
        test.questions = removeElement(test.questions, deleted._id);
        await test.save();

        return res.status(200).json({
            message: 'deleted',
            data: deleted
        });

    } catch (error) {
        next(error);
    }
}

exports.evaluateTest = async (req, res, next) => {
    const testId = req.params.id;
    try {

        const questions = await Question.find({ testId });
        const answerKey = {};

        // map all questions of the test to be evaluated
        questions.forEach(question => {
            answerKey[question._id.toString()] = {
                answer: question.answer,
                options: question.options,
                positive: question.positive,
                negative: question.negative
            }
        });

        const responses = await Response.find({ testId });

        responses.forEach(async response => {
            let score = 0;
            response.answers.forEach(answer => {

                const question = answerKey[answer.question.toString()];

                if (!question.options || !question) { return; }

                if (answer.response === question.answer) {
                    score += question.positive;
                } else {
                    score -= question.negative;
                }
            });
            response.score = score;
            await response.save();
        });

        return res.status(200).json({
            message: 'success',
            data: responses
        });

    } catch (error) {
        next(error);
    }
}

exports.getResults = async (req, res, next) => {
    const testId = req.params.id;
    try {
        
        const responses = await Response.find({ testId });
        return res.status(200).json({
            message: 'success',
            data: responses
        });

    } catch (error) {
        next(error);
    }
}


// utility functions

function appendUnique(list, value) {
    return list.includes(value) ? list : [...list, value];
}

function removeElement(list, value) {
    const idx = list.indexOf(value);
    if (idx > -1) {
        list.splice(idx, 1)
    }
    return list;
}