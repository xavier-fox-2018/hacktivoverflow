require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = (req, res, next) => {
  req.decoded = jwt.verify(req.headers.token, process.env.SECRET)
  User.findOne({ email: req.decoded.email })
    .then(data => {
      next()
    })
    .catch(err => {
      res.status(400).json(err)
    })
}