const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  ObjectId = require("mongodb").ObjectId,
  bcrypt = require("bcrypt"),
  User = require("../models/user"),
  Joi = require("joi"),
  Verifier = require("email-verifier")

require("dotenv").config();

class UserController {
  static findAll(req, res) { }
  static findOne(req, res) { }

  static register(req, res) { 
    const inp = req.body
    const newUser = new User({
      firstName: inp.firstName,
      lastName: inp.lastName,
      email: inp.email,
      password: inp.password
    })

    newUser.save((err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Database error',
          data: err
        })
      } else {
        res.status(201).json({
          message: 'Success',
          data: result
        })
      }
    })
  }
  static login(req, res) {
    const inp = req.body

    // !1. find the user based on email
    User.findOne({ email: inp.email })
      .exec((err, user) => {
        if (err) {
          res.status(400).json({
            message: "Database error"
          });
        }
        else {
          console.log(`ini user:`, user)
          if (!user) {
            res.status(400).json({
              message: "User not found"
            })
          } else {
            
            // !2. Compare password (ini belum pakai bcrypt)
            if (inp.password !== user.password) {
              res.status(400).json({
                message: "User not found"
              })
            } else {
              const userSign = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
              }
              res.json({
                message: "Success",
                token: jwt.sign(userSign, process.env.JWT_SECRET)
              }) 
            }
          }
        }
      })
  }

  // Verify user for every page
  static verify(req, res) {
    const inp = req.body
    jwt.verify(inp.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          message: "Token fail"
        })
      } else {
        res.json({
          message: "Token authorized"
        })
      }
    })
  }

  static updateOne(req, res) { }
  static deleteOne(req, res) { }
}

module.exports = UserController;