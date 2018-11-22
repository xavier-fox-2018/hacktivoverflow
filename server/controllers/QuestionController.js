const Question = require('../models/Question')
const mongoose = require('mongoose');

class QuestionController {
    static create(req, res) {
        Question.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        })
        .then(question => {
            res.status(201).json({
                message: 'a question posted',
                data: question
            })
        })
        .catch(err => {
            res.status(500).json({err})
            console.log(err)
        })
    }

    static getAll(req, res) {
        Question.find({})
                .populate('user')
            .then(questions => {
                res.status(200).json({data: questions})
            })
            .catch(err => {
                res.status(500).json({err})
                console.log(err)
            })
    }

    static getOne(req, res) {
        Question.findById(req.params.id)
            .then(question => {
                res.status(200).json({data: question})
            })
            .catch(err => {
                res.status(500).json({err})
                console.log(err)
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
        console.log(req.body)
        Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description
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

    static getMy(req, res) {
            Question.find({
                user: req.user._id
            })
            .populate('user')
            .then(questions => {
                res.status(200).json({data: questions})
            })
            .catch(err => {
                res.status(500).json({err})
                console.log(err)
            })
    }
    

    static vote(req, res){
        Question.findById(req.params.id)
            .then(question => {
                const userId = new mongoose.Types.ObjectId(req.user._id);
                if (!question.user.equals(userId)) {
                    let downVoted = question.downVote.indexOf(req.user._id) !== -1;
                    if (question.upVote.indexOf(req.user._id) === -1) {
                        if(downVoted){
                            question.update({
                                $pull: {
                                    downVote: req.user._id
                                }
                            })
                            .then(result => {
                                question.update({
                                    $push: {
                                        upVote: req.user._id
                                    }
                                })
                                .then(result => {
                                    res.status(200).json({message: 'success upVote a question'});
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({err})
                                })                                
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({err})
                            })
                        } else {
                            question.update({
                                $push: {
                                    upVote: req.user._id
                                }
                            })
                                .then(result => {
                                    res.status(200).json({message: 'success upVote a question'});
                                })
                                .catch(err => {
                                    res.status(500).json({err});
                                });
                        }
                    } else {
                            question.update({
                                $pull: {
                                    upVote: req.user._id
                                }
                            })
                            .then(result => {                                
                                res.status(200).json({message: 'success upVote a question'});
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({err});
                            });
                    }
                } else {
                    res.status(400).json({message: 'this is your question'})
                }
            })
            .catch(err => {
                res.status(500).json({err})
                console.log(err)
            })
    }
    static downvote(req, res){
        Question.findById(req.params.id)
            .then(question => {
                const userId = new mongoose.Types.ObjectId(req.user._id);
                if (!question.user.equals(userId)) {
                    let upVoted = question.upVote.indexOf(req.user._id) !== -1;
                    if (question.downVote.indexOf(req.user._id) === -1) {
                        if(upVoted){
                            question.update({
                                $pull: {
                                    upVote: req.user._id
                                }
                            })
                            .then(result => {
                                question.update({
                                    $push: {
                                        downVote: req.user._id
                                    }
                                })
                                .then(result => {
                                    res.status(200).json({message: 'success downVote a question'});
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({err})
                                })                                
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({err})
                            })
                        } else {
                            question.update({
                                $push: {
                                    downVote: req.user._id
                                }
                            })
                                .then(result => {
                                    res.status(200).json({message: 'success downVote a question'});
                                })
                                .catch(err => {
                                    res.status(500).json({err});
                                });
                        }
                    } else {
                            question.update({
                                $pull: {
                                    downVote: req.user._id
                                }
                            })
                            .then(result => {                                
                                res.status(200).json({message: 'success dopwnVote a question'});
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({err});
                            });
                    }
                } else {
                    res.status(400).json({message: 'this is your question'})
                }
            })
            .catch(err => {
                res.status(500).json({err})
                console.log(err)
            })
    }
}

module.exports = QuestionController