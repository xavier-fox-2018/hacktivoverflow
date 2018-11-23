const Answer = require('../models/Answer')

module.exports = {
    addAnswer: (req, res) =>{
        Answer.create({
            answer: req.body.answer,
            questionId: req.params.question,
            userId: req.decoded.id
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(err => {
            res. status(500).json(err)
        })
    },

    getAllAnswer: (req, res) =>{
        Answer.find({
            questionId: req.params.question
        })
        .populate("userId")
        .populate("questionId")
        .sort({createdAt: 'asc'})
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            });
        });
    
    }
}