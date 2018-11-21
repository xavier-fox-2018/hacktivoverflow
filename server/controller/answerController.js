const answerModel = require('../models/answer')
const questionModel = require('../models/question')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Controller{

    static allAnswer(req,res){
        answerModel.find()
        .populate('userId')
        .populate('questionId')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static readAnswer(req,res){
        answerModel.find({
            questionId: req.body.questionId
        })
        .populate('userId')
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static add (req, res){
        let data = jwt.verify(req.body.token, process.env.JWT_SECRET)
        answerModel.create({
            word: req.body.word,
            userId: data._id,
            questionId: req.body.id
        })
        .then(data => {
            res.send(data)
            
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }

    static delete(req,res){
       answerModel.deleteOne({
           _id: req.body.answerId
       })
       .then(data => {
           res.send(data)
       })
       .catch(err => {
           res.status(500).send(err)
       })
    }

    static upvote(req, res) {
        let user = jwt.verify(req.body.token, process.env.JWT_SECRET)
        answerModel.findOne({
            _id: req.body.answerId
        })
            .then(data => {
                let filteredup = data.upvote
                .filter(val => {
                    return val == user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
                    }, {
                            $push: { 'upvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
                    }, {
                            $pull: { 'upvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length == 0 && filtereddown != 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
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
        answerModel.findOne({
            _id: req.body.answerId
        })
            .then(data => {

                let filteredup = data.upvote.filter(val => {
                    return val == user._id
                })
                let filtereddown = data.downvote.filter(val => {
                    return val == user._id
                })

                if (filteredup.length == 0 && filtereddown.length == 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
                    }, {
                            $push: { 'downvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length != 0 && filtereddown.length == 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
                    }, {
                            $pull: { 'upvote': user._id },
                            $push: { 'downvote': user._id }
                        }, {
                            new: true
                        })
                } else if (filteredup.length == 0 && filtereddown != 0) {
                    return answerModel.findOneAndUpdate({
                        _id: req.body.answerId
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