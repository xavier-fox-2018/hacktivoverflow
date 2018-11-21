const Answer = require("../models/answer")
const Question = require("../models/question")

module.exports = {

  create: function (req,res) {

    let dataAnswer = new Answer ({
      description : req.body.description,
      answerBy : req.userId
    })

    dataAnswer.save()
      .then(function (answer){
        Question.update( 
          { _id: req.params.id },
          { $push: { answers: answer._id } 
        })
        .then(function () {
          res.status(200).json({
            answer,
            message: `create answer success`
          })
        })
      })
      .catch((err) => {
        res.status(500).json({
          err,
          message: `create answer failed`
        })
      })
  },

  update: function (req,res) {
    Answer.updateOne(
      { _id : req.params.id},
      { description : req.body.description },
      { runValidators : true }
    )
    .then(() => {
      res.status(201).json({
        message: `update comment success`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `update comment failed`
      })
    })
  },

  upvote: function (req, res) {
    Answer.findById(req.params.id)
    .populate(
      { path: 'upvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (answer) {
      if(answer.upvote.length === 0){
        Answer.update( { _id: req.params.id },
          { $push: { upvote: req.userId } })
          .then(function () {
            Answer.update( { _id: req.params.id },
              { $pull: { downvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  message: `upvote success`
                })
              })
          })
      } else {
        res.status(500).json({
          message: `you cant upvote again`
        })
      }
    })
  },

  downvote: function (req, res) {
    Answer.findById(req.params.id)
    .populate(
      { path: 'downvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (answer) {
      if(answer.downvote.length === 0){
        Answer.update( { _id: req.params.id },
          { $push: { downvote: req.userId } })
          .then(function () {
            Answer.update( { _id: req.params.id },
              { $pull: { upvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  message: `downvote success`
                })
              })
          })
      } else {
        res.status(500).json({
          message: `you can't downvote again`
        })
      }
    })
  },

  findOne: function (req,res) {
    
    Answer.findById(req.params.id)
      .then((response) => {
        res.status(201).json({
          response
        })
      }).catch((err) => {
        res.status(500).json({
          err
        })
      });

  },

  remove: function (req,res) {
    
  }
  

}