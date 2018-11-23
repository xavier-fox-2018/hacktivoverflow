const Question = require('../models/question')
const User = require('../models/user')
const mongoose = require('mongoose')

class QuestionController {
    static create(req, res) {
        Question.create({
            title: req.body.title,
            detail: req.body.detail,
            userID: req.userID,
        })
        .then( question => {
            res.status(201).json(question)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static readAll(req, res) {
        Question.find()
        .then( questions => {
            res.status(200).json(questions)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) { // cuma bisa oleh yg bikin
        Question.findOne({ _id: req.params.questionID, userID: req.userID })
        .then( question => {
            if (question) {
                Question.updateOne({ _id: req.params.questionID }, {
                    title: req.body.title,
                    detail: req.body.detail
                })
                .then( response => {
                    res.status(200).json(response)
                })
                .catch( err => {
                    res.status(500).json({err, msg: 'error from updateQuestion'})
                })
            }
            else {
                res.status(400).json({msg: 'you are not allowed to edit the question'})
            }
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from findQuestion'})
        })
    }

    static delete(req, res) {
        Question.findOne({ _id: req.params.questionID, userID: req.userID })
        .then( question => {
            if (question) {
                let deletedQuestion = question
                Question.deleteOne({ _id: req.params.questionID })
                .then( info => {
                    res.status(200).json({info, deletedQuestion})
                })
                .catch( err => {
                    res.status(500).json({err, msg: 'error from deleteQuestion'})
                })
            }
            else {
                res.status(400).json({msg: 'you are not allowed to delete the question'})
            }
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from findQuestion'})
        })
    }

    static upvote(req, res) {
        // console.log('masuk upvote', req.params.questionID);
        
        Question.findOne({ _id: req.params.questionID })
        .then( question => {
            let userID = new mongoose.Types.ObjectId(req.userID) // from middleware, ga usah gini langsung aja
                // console.log(userID, req.userID, question.userID);
                
                if (!question.userID.equals(userID)) {
                    let downVoted = question.downvote.indexOf(req.userID) !== -1

                    if (question.upvote.indexOf(req.userID) === -1) {

                        if (downVoted) {
                            question.update({
                                $pull: {
                                    downvote: req.userID
                                }
                            })
                            .then( resultPull => {
                                question.update({
                                    $push: {
                                        upvote: req.userID
                                    }
                                })
                                .then( resultPush => {
                                    res.status(200).json({msg: 'question is successfully upvoted'})
                                })
                                .catch( err => {
                                    res.status(500).json(err)
                                })
                            })
                            .catch( err => {
                                res.status(500).json(err)
                            })
                        }
                        else {
                            question.update({
                                $push: {
                                    upvote: req.userID
                                }
                            })
                            .then( result => {
                                res.status(200).json({msg: 'question is successfully upvoted'})
                            })
                            .catch( err => {
                                res.status(500).json(err)
                            })
                        }
                    }
                    else {
                        question.update({
                            $pull: {
                                upvote: req.userID
                            }
                        })
                        .then( result => {
                            res.status(200).json({msg: 'successfully cancel upvoting question'})
                        })
                        .catch( err => {
                            res.status(500).json(err)
                        })
                    }
                }
                else {
                    res.status(400).json({msg: 'you are not allowed to upvote your own post'})
                }
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

static downvote(req, res) {
        Question.findOne({ _id: req.params.questionID })
        .then(question => {
            const userID = new mongoose.Types.ObjectId(req.userID);

            if (!question.userID.equals(userID)) {
                let upVoted = question.upvote.indexOf(req.userID) !== -1;

                if (question.downvote.indexOf(req.userID) === -1) {

                    if (upVoted) {
                        question.update({
                            $pull: {
                                upvote: req.userID
                            }
                        })
                            .then( resultPull => {
                                question.update({
                                    $push: {
                                        downvote: req.userID
                                    }
                                })
                                    .then( resultPush => {
                                        res.status(200).json({msg: 'question is successfully downvoted'})
                                    })
                                    .catch(function(err) {
                                        res.status(500).json(err)
                                    });
                            })
                            .catch(function(err) {
                                res.status(500).json(err);
                            });
                    } 
                    else {
                        question.update({
                            $push: {
                                downvote: req.userID
                            }
                        })
                        .then(result => {
                            res.status(200).json({msg: 'question is successfully downvoted'})
                        })
                        .catch( err => {
                            res.status(500).json(err)
                        })
                    }
                } 
                else {
                    question.update({
                        $pull: {
                            downvote: req.userID
                        }
                    })
                    .then( result => {
                        res.status(200).json({msg: 'successfully cancel downvoting question'})
                    })
                    .catch( err => {
                        res.status(500).json(err)
                    })
                }
            } 
            else {
                res.status(400).json({msg: 'you are not allowed to downvote your own post'})
            }
        })
        .catch(function(err) {
            res.status(500).json(err);
        });
    }
}

module.exports = QuestionController