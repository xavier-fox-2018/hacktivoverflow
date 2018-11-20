const Comment = require('../models/Comment')

class CommentController {
    static getAll(req, res) {
        Comment.find({})
            .then(comments => {
                res.status(200).json({data: comments})
            })
            .catch(err => {
                res.status(500).json({err})
            })
    }

    static create(req, res) {
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
}

module.exports = CommentController