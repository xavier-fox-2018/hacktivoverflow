var Answers = require('../models/answers.js')
class AnswerController {
    static upvote(req, res) {
        Answers.findOne({
                _id: req.body.id
            })
            .then((data) => {
                let filterup = data.upvotes.filter(elem => {
                    console.log(req.logged_in_user._id)
                    return elem == String(req.logged_in_user._id)
                })
                let filterdown = data.downvotes.filter(elem => {
                    return elem == String(req.logged_in_user._id)
                })
                if (filterup.length == 0 && filterdown.length == 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $push: { "upvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                } else if (filterup.length == 0 && filterdown.length !== 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $push: { "upvotes": req.logged_in_user._id },
                            $pull: { "downvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                } else if (filterup.length !== 0 && filterdown.length == 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $pull: { "upvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static downvote(req, res) {
        Answers.findOne({
                _id: req.body.id
            })
            .then((data) => {
                let filterup = data.upvotes.filter(elem => {
                    return elem == String(req.logged_in_user._id)
                })
                let filterdown = data.downvotes.filter(elem => {
                    return elem == String(req.logged_in_user._id)
                })
                if (filterup.length == 0 && filterdown.length == 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $push: { "downvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                } else if (filterup.length == 0 && filterdown.length !== 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $pull: { "downvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                } else if (filterup.length !== 0 && filterdown.length == 0) {
                    Answers.findOneAndUpdate({
                            _id: req.body.id
                        }, {
                            $pull: { "upvotes": req.logged_in_user._id },
                            $push: { "downvotes": req.logged_in_user._id }
                        }, {
                            new: true
                        })
                        .then((data) => {
                            res.status(200).json(data)
                        })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static createAnswer(req, res) {
        Answers.create({
                content: req.body.content,
                user_id: req.logged_in_user._id,
                upvotes: [],
                downvotes: [],
                shares: [],
                question_id: req.body.question_id,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static getAnswersUser(req, res) {
        Answers.find({
                user_id: req.logged_in_user._id
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static getAnswers(req, res) {
        Answers.find({
                question_id: String(req.params.question_id)
            })
            .populate('user_id')
            .populate('upvotes')
            .populate('downvotes')
            .populate('shares')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static deleteAnswer(req, res) {
        Answers.deleteOne({
                _id: req.params.id
            })
            .then((data) => {
                AnswerController.getAnswersUser(req, res)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static updateAnswer(req, res) {
        Answers.updateOne({
                _id: req.params.id
            }, {
                content: req.body.content,
                updatedAt: new Date()
            })
            .then((data) => {
                Answers.find({
                        question_id: req.body.question_id
                    })
                    .then((data) => {
                        res.status(200).json(data)
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error update'
                })
            })
    }
    static getOneAnswer(req, res) {
        Answers.findOne({
                _id: String(req.params.id)
            })
            .populate('user_id')
            .populate('upvotes')
            .populate('downvotes')
            .populate('shares')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }

}
module.exports = AnswerController