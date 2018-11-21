const Answer = require("../models/answer")

function authVoteAnswer (req,res,next) {
  Answer.findOne({_id : req.params.id})
  .populate('answerBy')
  .then(function (answer) {
    if (String(answer.answerBy._id) == String(req.userId)) {
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

module.exports = authVoteAnswer