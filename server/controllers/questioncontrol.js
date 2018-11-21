const Question = require('../models/Question')

class QuestionController {
  static getAllQuestion(req, res, next) {
    Question.find().populate('owner', '-password').sort('-createdAt')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static getOwnQuestion(req, res, next) {
    Question.find({ owner: req.auth_user._id }).sort('-createdAt')
      .populate('owner', '-password')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static getOneQuestion(req, res, next) {
    Question.findById(req.params.id).populate('owner', '-password')
      .then(data => {
        res.status(200).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static createNewQuestion(req, res, next) {
    Question.create({
      title: req.body.title,
      owner: req.auth_user._id,
      question_body: req.body.question_body,
      upvote: [],
      downvote: []
    })
      .then(data => {
        res.status(201).json({
          result: data,
          error: null
        })
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static deleteQuestion(req, res, next) {
    Question.findById(req.params.id).populate('owner, -password')
      .then(data => {
        if (String(data.owner._id) === String(req.auth_user._id)) {
          Question.findByIdAndDelete(req.params.id)
            .then(data => {
              res.status(200).json({
                result: data,
                error: null
              })
            })
        } else {
          res.status(401).json({
            result: null,
            error: {
              message: 'Unauthorized to make changes'
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static updateQuestion(req, res, next) {
    Question.findById(req.params.id).populate('owner, -password')
      .then(data => {
        if (String(data.owner._id) === String(req.auth_user._id)) {
          Question.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            question_body: req.body.question_body
          })
            .then(data => {
              res.status(200).json({
                result: data,
                error: null
              })
            })
        } else {
          res.status(401).json({
            result: null,
            error: {
              message: 'Unauthorized to make changes'
            }
          })
        }
      })
      .catch(error => {
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static upvoteQuestion(req, res, next) {
    Question.findOne({
      _id: req.params.idQuestion
    })
      .then(data => {
        let filterUpvotes = data.upvotes.filter(val => 
          val == String(req.auth_user._id)
        )
        let filterDownvotes = data.downvotes.filter(val => 
          val == String(req.auth_user._id)
        )

        if (!filterUpvotes.length && !filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $push: { 'upvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (filterUpvotes.length && !filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $pull: { 'upvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (!filterUpvotes.length && filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $pull: { 'downvotes': req.auth_user._id },
              $push: { 'upvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else {
          res.status(403).json({
            data: null,
            error: 'unauthorized'
          })
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).json({
          data: null,
          error: error
        })
      })
  }
  static downvoteQuestion(req, res, next) {
    Question.findOne({
      _id: req.params.idQuestion
    })
      .then(data => {
        let filterUpvotes = data.upvotes.filter(val =>
          val == String(req.auth_user._id)
        )
        let filterDownvotes = data.downvotes.filter(val => 
          val == String(req.auth_user._id)
        )

        if (!filterUpvotes.length && !filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $push: { 'downvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (!filterUpvotes.length && filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $pull: { 'downvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (filterUpvotes.length && !filterDownvotes.length) {
          return Question.findOneAndUpdate({
            _id: req.params.idQuestion
          }, {
              $pull: { 'upvotes': req.auth_user._id },
              $push: { 'downvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else {
          res.status(403).json({
            data: null,
            error: 'unauthorized'
          })
        }
      })
      .then(data => {
        res.send(data)
      })
      .catch(error => {
        res.status(500).json({
          data: null,
          error: error
        })
      })
  }

}

module.exports = QuestionController