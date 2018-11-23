const Question = require("../models/question")

function authQuestion (req,res,next) {

  Question.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (question) {
      if (String(question.postBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access denied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access denied`
      })
    })
}

module.exports = authQuestion