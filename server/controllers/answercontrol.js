const Answer = require('../models/Answer')

class AnswerController {
  static getAll(req, res, next) {
    Answer.find()
      .populate('owner', '-password')
      .populate('question', '-question_body')
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
  static getOwnAnswer(req, res, next) {
    Answer.find({
      owner: req.auth_user._id
    })
      .populate('owner', '-password')
      .populate('question', '-question_body')
      .sort('-createdAt')
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
  static getByQuestion(req, res, next) {
    Answer.find({
      question: req.params.idQuestion
    })
      .populate('owner', '-password')
      .populate('question', '-question_body')
      .sort('-createdAt')
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
  static newAnswer(req, res, next) {
    Answer.create({
      owner: req.auth_user._id,
      question: req.params.idQuestion,
      answer_body: req.body.answer_body,
      upvote: [],
      downvote: []
    })
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
  static editAnswer(req, res, next) {
    Answer.findById(req.params.idAnswer).populate('owner, -password')
      .then(data => {
        if (String(data.owner._id) === String(req.auth_user._id)) {
          Answer.findByIdAndUpdate(req.params.idAnswer, {
            answer_body: req.body.answer_body
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
        console.log(error)
        res.status(500).json({
          result: null,
          error: error
        })
      })
  }
  static upvoteAnswer(req, res, next) {
    Answer.findOne({
      _id: req.params.idAnswer
    })
      .then(data => {
        let filterUpvotes = data.upvotes.filter(val => {
          return val == String(req.auth_user._id)
        })
        let filterDownvotes = data.downvotes.filter(val => {
          return val == String(req.auth_user._id)
        })

        if (!filterUpvotes.length && !filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
          }, {
              $push: { 'upvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (filterUpvotes.length && !filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
          }, {
              $pull: { 'upvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (!filterUpvotes.length && filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
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
  static downvoteAnswer(req, res, next) {
    Answer.findOne({
      _id: req.params.idAnswer
    })
      .then(data => {
        let filterUpvotes = data.upvotes.filter(val => {
          return val == String(req.auth_user._id)
        })
        let filterDownvotes = data.downvotes.filter(val => {
          return val == String(req.auth_user._id)
        })

        if (!filterUpvotes.length && !filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
          }, {
              $push: { 'downvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (!filterUpvotes.length && filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
          }, {
              $pull: { 'downvotes': req.auth_user._id }
            }, {
              new: true
            })
        } else if (filterUpvotes.length && !filterDownvotes.length) {
          return Answer.findOneAndUpdate({
            _id: req.params.idAnswer
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

module.exports = AnswerController