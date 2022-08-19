const Test = require('../models/test');
const Response = require('../models/response');

exports.getTest = async (req, res, next) => {
    const _id = req.params.id;

    const data = {
        testId: _id,
        // userame: req.user.username
        username: 'prateek',
    };

    try {

        const test = await Test.findById(_id, '-__v -author -contributors').populate('questions', '-answer -author -__v');

        if (new Date(test.start) > Date.now()) {
            return res.status(403).json({
                message: 'forbidden',
                start: test.start,
                end: test.end,
                duration: test.duration,
                wait: new Date(test.start) - Date.now()
            });
        }

        let response = await Response.findOne({ testId: _id, username: data.username }, '-__v');
        if (!response) {
            response = await new Response({ ...data }).save();
        }

        return res.status(200).json({
            message: 'success',
            data: {
                test,
                response
            }
        });

    } catch (error) {
        next(error);
    }
}

exports.postResponse = async (req, res, next) => {
    const _id = req.params.id;

    const data = {
        ...req.body,
        timestamp: Date.now()
    };

    try {
        const response = await Response.findById(_id);

        if (!response) {
            const error = new Error('not registered');
            error.code = 400;
            throw error;
        }

        response.answers = updateList(response.answers, data);

        const saved = await response.save();
        return res.status(200).json({
            message: 'saved',
            data: saved
        });

    } catch (error) {
        next(error);
    }
}

exports.deleteResponse = async (req, res, next) => {
    const _id = req.params.id;
    const q_id = req.query.q;
    try {

        const response = await Response.findById(_id);
        response.answers = removeElement(response.answers, q_id);

        const saved = await response.save();
        return res.status(200).json({
            message: 'deleted',
            data: saved
        });

    } catch (error) {
        next(error);
    }
}


// utility functions

function updateList(list, object) {
    const idx = list.findIndex(element => element.question.toString() === object.question);
    if (idx > -1) {
        list[idx] = object;
        return list;
    }
    return [...list, object];
}

function removeElement(list, id) {
    const idx = list.findIndex(element => element.question.toString() === id);
    if (idx > -1) {
        list.splice(idx, 1);
    }
    return list;
}