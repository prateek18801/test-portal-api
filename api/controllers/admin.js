const Test = require('../models/test');
const Question = require('../models/question');

exports.getTest = async (req, res, next) => {
    const _id = req.params.id;
    try {

        const data = _id ? await Test.findById({ _id }) : await Test.find({});

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
    req.body.code = req.body.code.toUpperCase();
    req.body.duration = new Date(req.body.end) - new Date(req.body.start);
    req.body.author = 'prateek';

    try {

        if (_id) {
            let existing = await Test.findById(_id);
            if (existing) {
               
                Object.keys(req.body).forEach(key => {
                    existing[key] = req.body[key];
                });
                
                const updated = await existing.save();
                return res.status(200).json({
                    message: 'upadated',
                    data: updated
                });
            }
        }

        const saved = await new Test({ ...req.body }).save();
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