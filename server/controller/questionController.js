const questionModel = require('../models/question')
const answerModel = require('../models/answer')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Controller {
    static add(req, res) {
        if (req.body.token === undefined) {
            res.status(401).json({ errMsg: 'unauthorize' })
        } else {
            let data = jwt.verify(req.body.token, process.env.JWT_SECRET)
            questionModel.create({
                title: req.body.title,
                body: req.body.body,
                userId: data._id
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static delete(req, res) {
        if (req.body.token === undefined) {
            res.status(401).send('unauthorize')
        } else {
            questionModel.deleteOne({
                _id: req.body.id
            })
                .then(data => {
                    // res.send(data)
                    return answerModel.deleteMany({
                        questionId: req.body.id
                    })
                })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log(err)
                    res.send(err)
                })
        }
    }

    static update(req, res) {
        // console.log(req.body)
        if (req.body.token === undefined) {
            res.status(400).json({ errMsg: 'unauthorized' })
        } else {
            questionModel.updateOne({
                _id: req.body.id
            }, {
                    title: req.body.title,
                    body: req.body.body
                })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        }
    }
    static readData(req, res) {
        questionModel.find({})
            .populate('userId')
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static readUser (req,res){
        let data = jwt.verify(req.body.token,process.env.JWT_SECRET)
        
        questionModel.find({
            userId: data._id
        })
        .populate('userId')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static upvote(req, res) {
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        questionModel.findOne({
            _id: req.body.questionId
        })
            .then(data => {

                let filteredup = data.upvote.filter(val => {
                    return val == user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $push: { 'upvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $pull: { 'upvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length == 0 && filtereddown != 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $pull: { 'downvote': user._id },
                            $push: { 'upvote': user._id }
                        }, {
                            new: true
                        })
                } else {
                    res.status(403).json({ errMsg: 'err' })
                }
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).json({
                    errMsg: err
                })
            })
    }

    static downvote(req,res){
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        questionModel.findOne({
            _id: req.body.questionId
        })
            .then(data => {

                let filteredup = data.upvote.filter(val => {
                    return val == user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $push: { 'downvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $pull: { 'upvote': user._id },
                            $push: { 'downvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length == 0 && filtereddown != 0) {
                    return questionModel.findOneAndUpdate({
                        _id: req.body.questionId
                    }, {
                            $pull: { 'downvote': user._id }
                        }, {
                            new: true
                        })
                } else {
                    res.status(403).json({ errMsg: 'err' })
                }
            })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).json({
                    errMsg: err
                })
            })
    }
}

module.exports = Controller