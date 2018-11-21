const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  ObjectId = require("mongodb").ObjectId,
  bcrypt = require("bcrypt"),
  Answer = require("../models/answer"),
  Question = require("../models/question"),
  Joi = require("joi"),
  Verifier = require("email-verifier");

require("dotenv").config();

class AnswerController {

  static create(req, res) {
    // console.log(req.body.user)

    /*
      1. Buat answer sampe save, terus push ke dalem collection yang isinya question tersebut dari inp
    */
    const inp = req.body
    const newAnswer = new Answer({
      content: inp.content,
      userId: ObjectId(inp.user.id),
      created: new Date(),
      answers: [],
      vote: []
    });

    newAnswer.save()
      .then(result => {
        console.log(result)

        Question.updateOne(
          {_id: inp.questionId},
          {$push: {answers: ObjectId(result._id)}},
          (err, success) => {
            console.log(`ini hasilnya anjing!`)
            // err ? console.log(err) : console.log(success)
            if (err) {}
            else {
              res.status(201).json({
                message: "New answer created",
                data: success
              })
            }
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  static upvote(req, res) {
    console.log(`upvote`)
  }

  static downvote(req, res) {
    console.log(`downvote`)
  }
}

module.exports = AnswerController;