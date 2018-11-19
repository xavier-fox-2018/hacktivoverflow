const User = require('../models/user');
const jwt = require('jsonwebtoken');

class Auth {
  static isLogin (req, res, next) {
    const decoded = jwt.verify(req.headers.token, process.env.JWT_TOKEN);
    console.log(decoded)
    User
      .findOne({
        email : decoded.email
      })
      .then(data => {
        req.user = decoded
        next()
      })
      .catch(err => {
        res.status(500).json({
          msg : decoded.email
        })
      })
  }
}

module.exports = Auth