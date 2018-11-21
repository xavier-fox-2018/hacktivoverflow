var User = require('../models/users.js')
var Question = require('../models/questions.js')
var Answer = require('../models/answers.js')
var Helper = require('../helpers/index.js')
class Middleware {
    static isLogin(req, res, next) {
        if (req.headers["token"] !== undefined) {
            let decoded = Helper.verifyToken(req.headers["token"]);
            User.findOne({
                    email: decoded.email
                })
                .then(function(data) {
                    if (data) {
                        req.logged_in_user = data
                        next()
                    } else {
                        next(res.status(500).json({
                            message: `Something went wrong`
                        }))
                    }
                })
                .catch(function(err) {
                    next(res.status(500).json({
                        message: `Something went wrong`
                    }))
                })
        } else {
            next(res.status(500).json({
                message: `Please signin first`
            }))
        }
    };
    static isQuestionOwner(req, res, next) {
        Question.findOne({
                _id: req.params.id
            })
            .then((data) => {
                if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Questions not found`
                }))
            })
    };
    static isNotQuestionOwner(req, res, next) {
        Question.findOne({
                _id: req.body.id
            })
            .then((data) => {
                if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Questions not found`
                }))
            })
    };
    static isAnswerOwner(req, res, next) {
        Answer.findOne({
                _id: req.params.id
            })
            .then((data) => {
                if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Answer not found`
                }))
            })
    };
    static isNotAnswerOwner(req, res, next) {
        Answer.findOne({
                _id: req.body.id
            })
            .then((data) => {
                if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Answer not found`
                }))
            })
    };
}
module.exports = Middleware