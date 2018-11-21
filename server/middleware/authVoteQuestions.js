const Question = require("../models/question")

function authVoteQuestions (req,res,next) {
  Question.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (question) {

      if (String(question.postBy._id) == String(req.userId)) {
        res.status(500).json({
          message : `you can't vote on your own`
        })
      } else {
        next()
      }
    })
    .catch(function () {
      res.status(500).json({
        message : `you can't vote on your own`
      })
    })
}

module.exports = authVoteQuestions