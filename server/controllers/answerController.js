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
        // ambil questionID, answerID, 
        // 
        // Answer.findOne({ _id: req.params.answerID })
    }

}

module.exports = AnswerController
