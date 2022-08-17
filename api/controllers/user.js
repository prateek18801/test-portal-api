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

        const test = await Test.findById(_id).populate('questions', '-answer -author -__v');

        let response = await Response.findOne({ testId: _id, username: data.username });
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

