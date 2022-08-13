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