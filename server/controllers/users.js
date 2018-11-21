require('dotenv').config()
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const generatePassword = require('../helpers/generatePassword')
const passwordLengthChecker = require('../helpers/passwordLengthChecker')

class UserController {
  static getUserDetail (req, res) {
    User.findById(req.params.id)
      .select('-salt -password')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static signup (req, res) {
    if (!passwordLengthChecker(req.body.password)) {
      res.status(400).json({ message: 'Password at least must have 4 character' })
    }
    let buf = crypto.randomBytes(256).toString('hex')
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: generatePassword(req.body.password, buf),
      salt: buf
    })

    user.save()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        if (err.code == 11000) {
          res.status(400).json({ message: 'Email is already exist' })
        }
        res.status(500).json(err)
      })
  }

  static signin (req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(data => {
        if (data.password === generatePassword(req.body.password, data.salt)) {
          let token = jwt.sign({ id: data._id, email: data.email, name: data.name }, process.env.SECRET)
          res.status(200).json({ token, name: data.name })
        } else {
          res.status(400).json({ message: "Your email or password is wrong" })
        }
      })
      .catch(err => {
        res.status(400).json({ message: "Your email or password is wrong" })
      })
  }

  static oAuthSignin (req, res) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data) {
          let token = jwt.sign({ id: data._id, email: data.email, name: data.name }, process.env.SECRET)
          res.status(200).json({ token, name: data.name })
        } else {
          User.create({
            email: req.body.email,
            name: req.body.name
          })
            .then(response => {
              let token = jwt.sign({ id: response._id, email: response.email, name: response.name }, process.env.SECRET)
              res.status(200).json({ token, name: response.name })
            })
            .catch(err => {
              res.status(500).json(err)
            })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController
