const jwt = require('jsonwebtoken'),
      ObjectId = require("mongodb").ObjectId;

require("dotenv").config();

function authorize(req, res, next) {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json({
        message: "Token unauthorized",
        data: err
      })
    } else {
      // harus dipisah bagian ini =>
      // if (req.body.title && req.body.content) {
        req.body.user = decoded
        next()
      // }
    }
  })
}

module.exports = authorize 