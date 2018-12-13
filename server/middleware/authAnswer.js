const Answer = require("../models/answer")

function authAnswer (req,res,next) {

  Answer.findOne({_id : req.params.id})
    .populate('answerBy')
    .then(function (answer) {
      if (String(answer.answerBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access danied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access danied`
      })
    })

}

module.exports = authAnswer