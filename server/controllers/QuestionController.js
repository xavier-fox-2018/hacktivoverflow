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
                let checkVote = question.upVoters.findIndex(upVoter=> upVoter == req.decoded.id)
                if(checkVote !== -1){
                    Question.update({
                        _id: req.params.id
                    }, {
                        $pull: {upVoters:{$in : [req.decoded.id]}}
                    })
                        .then(report=>{
                            res.status(200).json({
                                message: 'Undo Vote Success',
                                report: report
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                message: 'Internal Server Error',
                                err: err.message
                            })
                        })
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
         Question.findOne({
            _id: req.params.id
        })
            .then(question=>{
                let checkVote = question.downVoters.findIndex(downVoter=> downVoter == req.decoded.id)
                if(checkVote !== -1){
                    Question.update({
                        _id: req.params.id
                    }, {
                        $pull: {downVoters:{$in : [req.decoded.id]}}
                    })
                        .then(report=>{
                            res.status(200).json({
                                message: 'Undo Vote Success',
                                report: report
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                message: 'Internal Server Error',
                                err: err.message
                            })
                        })
                } else {
                    Question.update({
                        _id: req.params.id
                    }, {
                        $push: {downVoters: req.decoded.id}
                    })
                        .then(report=>{
                            res.status(200).json({
                                message: 'DownVote success!',
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

}

module.exports = QuestionController