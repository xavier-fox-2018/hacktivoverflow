const Question = require('../models/questions')

module.exports = (req, res, next) => {
  Question.findById(req.params.id)
    .then(data => {
      if (data.author == req.decoded.id) {
        res.status(400).json({ message: "You can't vote your own question"})
      } else {
        next()
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}