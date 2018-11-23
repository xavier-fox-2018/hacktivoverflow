const Question = require('../models/Question')
const Answer = require('../models/Answer')
const Comment = require('../models/Comment')
const Tag = require('../models/Tag')
const jwtHelper = require('../helpers/jwtHelper')

class QuestionController {
    static create(req,res){
        let user = req.decoded
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
                console.log(err)
                res.status(500).json({
                    message: 'Internal Server Error',
                    errors: err.errors
                })
            })
    }

    static index(req,res){
        Question.find()
            .populate('author')
            .populate('answers')
            .sort({createdAt: -1})
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

    static upvote(req,res){
        Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.upVoters.findIndex(upVoter=> upVoters == req.decoded.id)
                if(checkVote !== -1){
                    res.status(400).json({errors: {
                        vote: {
                            message: 'You are already upvote this question'
                        }
                    }})
                } else {
                    Question.update({
                        _id: req.params.id
                    }, {
                        $push: {upVoters: req.decoded.id}
                    })
                        .then(report=>{
                            res.status(200).json({
                                message: 'Upvote success!',
                                report: report
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                err: err.message
                            })
                        })
                }
            })
        
    }

    static downvote(req,res){
        Question.update({
            _id: req.params.id
        }, {
            $pull: {} 
        })
    }

}

module.exports = QuestionController