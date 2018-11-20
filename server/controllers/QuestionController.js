const Question = require('../models/Question')

class QuestionController {
    static create(req, res) {
        Question.create({
            question: req.body.question,
            user: req.user._id
        })
        .then(question => {
            res.status(201).json({
                message: 'a question posted',
                data: question
            })
        })
    }

    static getAll(req, res) {
        Question.find({})
                .populate('user')
            .then(questions => {
                res.status(200).json({data: questions})
            })
    }

    static delete(req, res) {
        Question.findByIdAndDelete(req.params.id)
            .then(question => {
                res.status(200).json({
                    message: 'a question has been deleted',
                    data: question
                })
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }

    static update(req, res) {
        Question.findByIdAndUpdate(req.params.id, {
            question: req.body.question
        })
            .then(question => {
                res.status(201).json({
                    message: 'a question updated',
                    data: question
                })
            })
            .catch(err => {
                res.status(500).json({
                    err
                })
            })
    }
}

module.exports = QuestionController