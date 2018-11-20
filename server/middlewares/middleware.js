const User = require("../models/User");
const Question = require('../models/Question')
const Comment = require('../models/Comment')
const jwt = require("jsonwebtoken");

class Middleware {

  static isLogin(req, res, next) {
    if (req.headers.hasOwnProperty("token")) {
      try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET);
        User.findOne({
          email: decoded.email
        })
          .then(user => {
            if (user) {
              req.user = user;
              next();
            } else {
              res.status(400).json({ message: "no access login" });
            }
          })
          .catch(err => {
            res.status(500).json({ message: "no jwt jwt error, please login" });
          });
      } catch (err) {
        res.status(500).json({ message: "jwt error, please login" });
      }
    } else {
      res.status(400).json({ message: "no token access" });
    }
  }

  static ownQuestion (req, res, next) {
      Question.findById(req.params.id)
        .then(question => {
            if(question){
              if (question.user.equals(req.user._id)) {
                next()
              } else {
                res.status(400).json({err: 'this is not your question'})
              }
            } else {
              res.status(400).json({err: 'no question found'})
            }
        })
        .catch(err => {
          res.status(500).json({err})
        })
  }
}


module.exports = Middleware