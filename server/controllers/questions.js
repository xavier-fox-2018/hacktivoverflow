var Question = require('../models/questions.js')
var Helper = require('../helpers/index.js')

class QuestionController {
    static createQuestion(req, res) {
        let tmp = req.logged_in_user._id
        if (req.body.anom == 'true') {
            tmp = undefined
        }
        Question.create({
                title: req.body.title,
                content: req.body.content,
                createdAt: new Date(),
                updatedAt: new Date(),
                user_id: req.logged_in_user._id,
                downvotes: [],
                upvotes: [],
                shares: [],
                anom: req.body.anom
            })
            .then((data) => {
                Question.findOne({
                        _id: data._id
                    }).populate('user_id')
                    .then((response) => {
                        res.status(200).json(response)
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static getAllQuestions(req, res) {
        Question.find({})
            .populate('user_id')
            .populate('downvotes')
            .populate('upvotes')
            .populate('shares')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static getMyQuestions(req, res) {
        Question.find({
                user_id: req.logged_in_user._id
            })
            .populate('user_id')
            .populate('downvotes')
            .populate('upvotes')
            .populate('shares')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static getOneQuestion(req, res) {
        Question.findOne({
                _id: req.params.id
            })
            .populate('user_id')
            .populate('downvotes')
            .populate('upvotes')
            .populate('shares')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static deleteQuestion(req, res) {
        Question.deleteOne({
                _id: req.params.id
            })
            .then((data) => {
                QuestionController.getAllQuestions(req, res)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
    static updateQuestion(req, res) {
        Question.updateOne({
                _id: req.params.id
            }, {
                title: req.body.title,
                content: req.body.content,
                anom: req.body.anom,
                updatedAt: new Date()
            })
            .then((data) => {
                QuestionController.getAllQuestions(req, res)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error update'
                })
            })
    }
    static upvote(req, res) {
        Question.findOne({
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
                    Question.findOneAndUpdate({
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
                    Question.findOneAndUpdate({
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
                    Question.findOneAndUpdate({
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
        Question.findOne({
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
                    Question.findOneAndUpdate({
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
                    Question.findOneAndUpdate({
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
                    Question.findOneAndUpdate({
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
}
module.exports = QuestionController