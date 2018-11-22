const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Comment = require('../models/Comment')
const Tag = require('../models/Tag')
const jwtHelper = require('../helpers/jwtHelper')

class QuestionController {
    static create(req,res){
        let user = jwtHelper.decode(req.headers.token)
        Question.create({
            author : user.id,
            body: req.body.body
        })
            .then(question=>{
                res.status(200).json({
                    message : 'Questions already saved!',
                    question: question
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

    static index(req,res){
        Question.find()
            .populate('author')
            .populate('answers')
            .then(questions=>{
                res.status(200).json(questions)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

}

module.exports = QuestionController