const Answer = require('../models/answerModel.js');
const mongoose = require('mongoose');

class AnswerController {
    static add(req, res) {
        Answer.create({
            content: req.body.content,
            question: req.params.question_id,
            user: req.user._id
        })
            .then(function(answer) {
                res.status(200).json(answer);
            })
            .catch(function(err) {
                console.log('Create Answer Error: ', err);
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Answer.find({question: req.params.question_id}).populate('user', '_id username email')
            .then(function(answers) {
                res.status(200).json(answers);
            })
            .catch(function(err) {
                console.log('Find All Answers Of A Question Error: ', err);
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Answer.updateOne({question: req.params.question_id, user: req.user._id, _id: req.body.id}, {content: req.body.content})
            .then(function(result) {
                const response = {
                    success: true,
                    message: `Answer successfully updated`
                };
                res.status(200).json(response);
            })
            .catch(function(err) {
                console.log('Update Answer Error: ', err);
                res.status(500).json(err);
            });
    }

    static upvote(req, res) {
        Answer.findOne({question: req.params.question_id, _id: req.body.id})
            .then(function(answer) {
              const userId = new mongoose.Types.ObjectId(req.user._id);
                // checks if user wants to upvote his own answer    
                if (answer.user.equals(userId) === false) {
                    // checks if user has already downvoted this answer
                    let alreadyDownvote = answer.downvotes.indexOf(req.user._id) !== -1;
                    // checks if user has already upvoted this answer
                    if (answer.upvotes.indexOf(req.user._id) === -1) {
                        // if user has already downvoted and choose to upvote, then his downvote will be removed and his upvote will be added
                        if (alreadyDownvote) {
                            answer.update({
                                $pull: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(pullResult) {
                                    answer.update({
                                        $push: {
                                            upvotes: req.user._id
                                        }
                                    })
                                        .then(function(pushResult) {
                                            let response = {
                                                message: 'Successfully upvoted answer'
                                            }
                                            res.status(200).json(response);
                                        })
                                        .catch(function(err) {
                                            console.log('Push Answer Upvote Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Pull Answer Downvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        } else {
                            answer.update({
                                $push: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(pushResult) {
                                    let response = {
                                        message: 'Successfully upvoted answer'
                                    }
                                    res.status(200).json(response);
                                })
                                .catch(function(err) {
                                    console.log('Push Answer Upvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        answer.update({
                            $pull: {
                                upvotes: req.user._id
                            }
                        })
                            .then(function(pullResult) {
                                let response = {
                                    message: 'Successfully un-upvoted answer'
                                }
                                res.status(200).json(response);
                            })
                            .catch(function(err) {
                                console.log('Pull Answer Upvote Error: ', err);
                                res.status(500).json(err);
                            });
                    }
                } else {
                    console.log('You cannot upvote your own answer');
                    res.status(400).json({
                        message: 'You cannot upvote your own answer'
                    });
                }
            })
            .catch(function(err) {
                console.log('Find Answer While Upvoting Error: ', err);
                res.status(500).json(err);
            });
    }

    static downvote(req, res) {
        Answer.findOne({question: req.params.question_id, _id: req.body.id})
            .then(function(answer) {
              const userId = new mongoose.Types.ObjectId(req.user._id);
                // checks if user wants to downvote his own answer
                if (answer.user.equals(userId) === false) {
                    // checks if user has already upvoted this answer
                    let alreadyUpvote = answer.upvotes.indexOf(req.user._id) !== -1;
                    // checks if user has already downvoted this answer
                    if (answer.downvotes.indexOf(req.user._id) === -1) {
                        // if user has already upvoted and choose to downvote, then his upvote will be removed and his downvote will be added
                        if (alreadyUpvote) {
                            answer.update({
                                $pull: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(pullResult) {
                                    answer.update({
                                        $push: {
                                            downvotes: req.user._id
                                        }
                                    })
                                        .then(function(pushResult) {
                                            let response = {
                                                message: 'Successfully downvoted answer'
                                            }
                                            res.status(200).json(response);
                                        })
                                        .catch(function(err) {
                                            console.log('Push Answer Downvote Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Pull Answer Upvote Error: ', err);
                                    res.status(500).json(err);
                                })
                        } else {
                            answer.update({
                                $push: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(pushResult) {
                                    let response = {
                                        message: 'Successfully downvoted answer'
                                    }
                                    res.status(200).json(response);
                                })
                                .catch(function(err) {
                                    console.log('Push Answer Downvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        answer.update({
                            $pull: {
                                downvotes: req.user._id
                            }
                        })
                            .then(function(pullResult) {
                                let response = {
                                    message: 'Successfully un-downvoted answer'
                                }
                                res.status(200).json(response);
                            })
                            .catch(function(err) {
                                console.log('Pull Answer Downvote Error: ', err);
                                res.status(500).json(err);
                            });
                    }
                } else {
                    console.log('You cannot downvote your own answer');
                    res.status(400).json({
                        message: 'You cannot downvote your own answer'
                    });
                }
            })
            .catch(function(err) {
                console.log('Find Answer While Downvoting Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = AnswerController;