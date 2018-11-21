const Question = require('../models/questionModel.js');
const Answer = require('../models/answerModel.js');
const Achievement = require('../models/achievementModel.js');
const User = require('../models/userModel.js');
const mongoose = require('mongoose');

class QuestionController {
    static create(req, res) {
        let question = new Question({
            title: req.body.title,
            description: req.body.description,
            poster: req.user._id
        });
        question.save()
            .then(function(question) {
                const response = {
                    success: true,
                    message: `Question ${question.title} created`,
                    question: question
                };
                res.status(201).json(response);
            })
            .catch(function(err) {
                console.log('Create Question Error: ', err);
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Question.find().populate('poster', '-password')
            .then(function(questions) {
                res.status(200).json(questions);
            })
            .catch(function(err) {
                console.log('Get All Questions Error: ', err);
                res.status(500).json(err);
            });
    }

    static findWithId(req, res) {
        Question.findById(req.params.id).populate('poster', '-password')
            .then(function(question) {
                res.status(200).json(question);
            })
            .catch(function(err) {
                console.log('Get One Question Error: ', err);
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Question.findOne({_id: req.params.id, poster: req.user._id})
            .then(function(question) {
                if (question) {
                    question.title = req.body.title;
                    question.description = req.body.description;

                    question.save()
                        .then(function(result) {
                            const response = {
                                success: true,
                                message: `Question successfully updated`
                            };
                            res.status(200).json(response);
                        })
                        .catch(function(err) {
                            console.log('Update Question Error: ', err);
                            res.status(500).json(err);
                        });
                } else {
                    console.log('Question not found');
                    res.status(404).json({
                        message: 'Question not found'
                    });
                }
            })
            .catch(function(err) {
                console.log('Find Question While Updating Error: ', err);
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Question.deleteOne({_id: req.params.id, poster: req.user._id})
            .then(function(result) {
                Answer.deleteMany({question: req.params.id})
                    .then(function(answerResult) {
                        const response = {
                            success: true,
                            message: `Question successfully deleted`
                        };
                        res.status(200).json(response);
                    })
                    .catch(function(err) {
                        console.log('Delete All Answers While Deleting Question Error: ', err);
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                console.log('Delete Question Error: ', err);
                res.status(500).json(err);
            });
    }

    static findByPoster(req, res) {
        const posterId = new mongoose.Types.ObjectId(req.user._id);
        Question.find().populate('poster', '-password')
            .then(function(questions) {
                const result = questions.filter(function(datum) {
                    return posterId.equals(datum.poster._id);
                });
                res.status(200).json(result);
            })
            .catch(function(err) {
                console.log('Find Questions of Login Poster Error: ', err);
                res.status(500).json(err);
            });
    }

    static searchQuestion(req, res) {
        Question.find({title: new RegExp(req.params.keyword, 'i')})
            .then(function(questions) {
                res.status(200).json(questions);
            })
            .catch(function(err) {
                console.log('Search Questions Error: ', err);
                res.status(500).json(err); 
            });
    }

    static upvote(req, res) {
        Question.findOne({_id: req.params.id})
            .then(function(question) {
              const posterId = new mongoose.Types.ObjectId(req.user._id);
                // checks if user wants to upvote his own question
                if (question.poster.equals(posterId) === false) {
                    // checks if user has already downvoted this question
                    let alreadyDownvote = question.downvotes.indexOf(req.user._id) !== -1;
                    // checks if user has already upvoted this question
                    if (question.upvotes.indexOf(req.user._id) === -1) {
                        // if user has already downvoted and choose to upvote, then his downvote will be removed and his upvote will be added
                        if (alreadyDownvote) {
                            question.update({
                                $pull: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(pullResult) {
                                    question.update({
                                        $push: {
                                            upvotes: req.user._id
                                        }
                                    })
                                        .then(function(pushResult) {
                                            Question.findById(req.params.id)
                                                .then(function(question) {
                                                    if (question.upvotes.length >= 3) {
                                                        Achievement.findOne({name: 'Superman'})
                                                            .then(function(achievement) {
                                                                User.findById(question.poster._id)
                                                                    .then(function(poster) {
                                                                        const filterAchievements = poster.achievements.filter(function(data) {
                                                                            return achievement._id.equals(data);
                                                                        });

                                                                        if (filterAchievements.length === 0) {
                                                                            User.findByIdAndUpdate(question.poster._id, {
                                                                                $push: {
                                                                                    achievements: achievement._id
                                                                                }
                                                                            })
                                                                                .then(function(pushResult) {
                                                                                    const response = {
                                                                                        message: `Congratulations you just got the Superman achievement!`
                                                                                    };
                                                                                    res.status(200).json(response);
                                                                                })
                                                                                .catch(function(err) {
                                                                                    console.log('Push Achievement Error: ', err);
                                                                                    res.status(500).json(err);
                                                                                });
                                                                        }
                                                                    })
                                                                    .catch(function(err) {
                                                                        console.log('Find User While Giving Achievement Error: ', err);
                                                                        res.status(500).json(err);
                                                                    });
                                                                
                                                            })
                                                            .catch(function(err) {
                                                                console.log('Find Achievement Error: ', err);
                                                                res.status(500).json(err);
                                                            });
                                                    } else {
                                                        let response = {
                                                            message: 'Successfully upvoted question'
                                                        }
                                                        res.status(200).json(response);
                                                    }
                                                })
                                                .catch(function(err) {
                                                    console.log('Find Question To Get New Total Upvotes Error: ', err);
                                                    res.status(500).json(err);
                                                });
                                        })
                                        .catch(function(err) {
                                            console.log('Push Question Upvote Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Pull Question Downvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        } else {
                            question.update({
                                $push: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(pushResult) {
                                    Question.findById(req.params.id)
                                        .then(function(question) {
                                            if (question.upvotes.length >= 3) {
                                                Achievement.findOne({name: 'Superman'})
                                                    .then(function(achievement) {
                                                        User.findById(question.poster._id)
                                                            .then(function(poster) {
                                                                const filterAchievements = poster.achievements.filter(function(data) {
                                                                    return achievement._id.equals(data);
                                                                });

                                                                if (filterAchievements.length === 0) {
                                                                    User.findByIdAndUpdate(question.poster._id, {
                                                                        $push: {
                                                                            achievements: achievement._id
                                                                        }
                                                                    })
                                                                        .then(function(pushResult) {
                                                                            const response = {
                                                                                message: `Congratulations you just got the Superman achievement!`
                                                                            };
                                                                            res.status(200).json(response);
                                                                        })
                                                                        .catch(function(err) {
                                                                            console.log('Push Achievement Error: ', err);
                                                                            res.status(500).json(err);
                                                                        });
                                                                }
                                                            })
                                                            .catch(function(err) {
                                                                console.log('Find User While Giving Achievement Error: ', err);
                                                                res.status(500).json(err);
                                                            });
                                                        
                                                    })
                                                    .catch(function(err) {
                                                        console.log('Find Achievement Error: ', err);
                                                        res.status(500).json(err);
                                                    });
                                            } else {
                                                let response = {
                                                    message: 'Successfully upvoted question'
                                                }
                                                res.status(200).json(response);
                                            }
                                        })
                                        .catch(function(err) {
                                            console.log('Find Question To Get New Total Upvotes Error: ', err);
                                            res.status(500).json(err);
                                        });                                 
                                })
                                .catch(function(err) {
                                    console.log('Push Question Upvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        question.update({
                            $pull: {
                                upvotes: req.user._id
                            }
                        })
                            .then(function(pullResult) {
                                let response = {
                                    message: 'Successfully un-upvoted question'
                                }
                                res.status(200).json(response);
                            })
                            .catch(function(err) {
                                console.log('Pull Question Upvote Error: ', err);
                                res.status(500).json(err);
                            });
                    }
                } else {
                    console.log('You cannot upvote your own post');
                    res.status(400).json({
                        message: 'You cannot upvote your own post'
                    });
                }
            })
            .catch(function(err) {
                console.log('Find Question While Upvoting Error: ', err);
                res.status(500).json(err);
            });
    }

    static downvote(req, res) {
        Question.findOne({_id: req.params.id})
            .then(function(question) {
              const posterId = new mongoose.Types.ObjectId(req.user._id);
                // checks if user wants to downvote his own question
                if (question.poster.equals(posterId) === false) {
                    // checks if user has already upvoted this question
                    let alreadyUpvote = question.upvotes.indexOf(req.user._id) !== -1;
                    // checks if user has already downvoted this question
                    if (question.downvotes.indexOf(req.user._id) === -1) {
                        // if user has already upvoted and choose to downvote, then his upvote will be removed and his downvote will be added
                        if (alreadyUpvote) {
                            question.update({
                                $pull: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(pullResult) {
                                    question.update({
                                        $push: {
                                            downvotes: req.user._id
                                        }
                                    })
                                        .then(function(pushResult) {
                                            let response = {
                                                message: 'Successfully downvoted question'
                                            }
                                            res.status(200).json(response);
                                        })
                                        .catch(function(err) {
                                            console.log('Push Question Downvote Error: ', err);
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    console.log('Pull Question Upvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        } else {
                            question.update({
                                $push: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(pushResult) {
                                    let response = {
                                        message: 'Successfully downvoted question'
                                    }
                                    res.status(200).json(response);
                                })
                                .catch(function(err) {
                                    console.log('Push Question Downvote Error: ', err);
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        question.update({
                            $pull: {
                                downvotes: req.user._id
                            }
                        })
                            .then(function(pullResult) {
                                let response = {
                                    message: 'Successfully un-downvoted question'
                                }
                                res.status(200).json(response);
                            })
                            .catch(function(err) {
                                console.log('Pull Question Downvote Error: ', err);
                                res.status(500).json(err);
                            });
                    }
                } else {
                    console.log('You cannot downvote your own post');
                    res.status(400).json({
                        message: 'You cannot downvote your own post'
                    });
                }
            })
            .catch(function(err) {
                console.log('Find Question While Downvoting Error: ', err);
                res.status(500).json(err);
            });
    }

    static incrementCount(req, res) {
        Question.findById(req.params.id)
            .then(function(question) {
                let viewCount = question.viewCount;
                question.viewCount = viewCount + 1;

                if (question.viewCount >= 10) {
                    Achievement.findOne({name: 'Popular Question'})
                        .then(function(achievement) {
                            User.findById(question.poster._id)
                                .then(function(poster) {
                                    const filterAchievements = poster.achievements.filter(function(data) {
                                        return achievement._id.equals(data);
                                    });

                                    if (filterAchievements.length === 0) {
                                        User.findByIdAndUpdate(question.poster._id, {
                                            $push: {
                                                achievements: achievement._id
                                            }
                                        })
                                            .then(function(pushResult) {
                                                question.save()
                                                    .then(function(result) {
                                                        const response = {
                                                            message: `Conratulations you just got the Popular Question achievement!`
                                                        };
                                                        res.status(200).json(response);
                                                    })
                                                    .catch(function(err) {
                                                        console.log('Update View Count Error: ', err);
                                                        res.status(500).json(err);
                                                    });
                                            })
                                            .catch(function(err) {
                                                console.log('Push Achievement Error: ', err);
                                                res.status(500).json(err);
                                            });
                                    } else {
                                        res.status(200).json({
                                            message: 'Successfully added view count'
                                        });
                                    }
                                })
                                .catch(function(err) {
                                    console.log('Find User While Giving Achievement Error: ', err);
                                    res.status(500).json(err);
                                });
                            
                        })
                        .catch(function(err) {
                            console.log('Find Achievement Error: ', err);
                            res.status(500).json(err);
                        });
                } else {
                    question.save()
                        .then(function(result) {
                            res.status(200).json({
                                message: 'Successfully added view count'
                            });
                        })
                        .catch(function(err) {
                            console.log('Update View Count Error: ', err);
                            res.status(500).json(err);
                        });
                }
            })
            .catch(function(err) {
                console.log('Find Question Error While Incrementing View Count Error: ', err);
            });
    }

    static addAchievement(req, res) {
        let achievement = new Achievement({
            name: req.body.name
        });

        achievement.save()
            .then(function(achievement) {
                res.status(201).json({
                    message: `Successfully added ${achievement.name}`
                });
            })
            .catch(function(err) {
                console.log('Add Achievement Error: ', err);
                res.status(500).json(err);
            });
    }
}

module.exports = QuestionController;