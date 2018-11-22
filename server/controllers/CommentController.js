const Comment = require('../models/Comment')
const mongoose = require('mongoose')

class CommentController {
    static getAll(req, res) {
            Comment.find({
                question: req.params.questionId
            })
            .populate('user')
            .then(comments => {
                res.status(200).json({data: comments})
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }

    static create(req, res) {
        console.log('commen')
        Comment.create({
            comment: req.body.comment,
            user: req.user._id,
            question: req.params.questionId
        })
        .then(comment => {
            res.status(201).json({
                message: 'commeted on a questions'
            })
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static voteanswer(req, res){
        Comment.findById(req.params.id)
        .then(comment => {
            const userId = new mongoose.Types.ObjectId(req.user._id);
            if (!comment.user.equals(userId)) {
                let downVoted = comment.downVote.indexOf(req.user._id) !== -1;
                if (comment.upVote.indexOf(req.user._id) === -1) {
                    if(downVoted){
                        comment.update({
                            $pull: {
                                downVote: req.user._id
                            }
                        })
                        .then(result => {
                            comment.update({
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
                        comment.update({
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
                        comment.update({
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

    static downvoteanswer(req, res){
        Comment.findById(req.params.id)
        .then(comment => {
            const userId = new mongoose.Types.ObjectId(req.user._id);
            if (!comment.user.equals(userId)) {
                let upVoted = comment.upVote.indexOf(req.user._id) !== -1;
                if (comment.downVote.indexOf(req.user._id) === -1) {
                    if(upVoted){
                        comment.update({
                            $pull: {
                                upVote: req.user._id
                            }
                        })
                        .then(result => {
                            comment.update({
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
                        comment.update({
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
                        comment.update({
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

module.exports = CommentController