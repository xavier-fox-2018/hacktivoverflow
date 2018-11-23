const Answer = require('../models/answer')
const Question = require('../models/question')

class AnswerController {
    static create(req, res) {
        Answer.create({
            detail: req.body.detail,
            questionID: req.params.questionID,
            userID: req.userID
        })
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static readAll(req, res) {
        Answer.find({
            questionID: req.params.questionID
        })
        .then( answers => {
            res.status(200).json(answers)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        Answer.findOne({ _id: req.params.answerID, userID: req.userID })
        .then( answer => {
            if (answer) {
                Answer.updateOne({ _id: req.params.answerID }, {
                    detail: req.body.detail
                })
                .then( response => {
                    res.status(200).json({response, newAnswer: req.body.detail })
                })
                .catch( err => {
                    res.status(500).json({err, msg: 'error from updateAnswer'})
                })
            }
            else {
                res.status(400).json({msg: 'you are not allowed to edit the answer'})
            }
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from findAnswer'})
        })
    }

}

module.exports = AnswerController
