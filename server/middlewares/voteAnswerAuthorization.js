const Answer = require('../models/answers')

module.exports = (req, res, next) => {
  Answer.findById(req.params.id)
    .then(data => {
      if (data.writer == req.decoded.id) {
        res.status(400).json({ message: "You can't vote your own answer"})
      } else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}