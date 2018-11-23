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

  static delete(req, res) {
    Answer.deleteOne({_id: req.params.answerId})
      .then(result => {
        res.json({
          message: "Answer deleted successfully",
          data: result
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Something went wrong",
          data: err
        })
      })
  }

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

    // 0. find the answer
    Answer.findOne({_id: req.params.answerId})
    .then(result => {
      // 1. check if it exists in upvote
      let condition = {$push: {upvote: req.body.user.id}}

      for (let i = 0; i < result.upvote.length; i++) {
        result.upvote[i] == req.body.user.id ? condition = {$pull: {upvote: req.body.user.id}} : null
      }

      // 2. add or remove internally in the key
      Answer.updateOne(
        { _id: req.params.answerId },
        condition
      )
      .then(result => {
        console.log(result)
        // 3. remove from  other key
        Answer.updateOne(
          { _id: req.params.answerId },
          { $pull: { downvote: req.body.user.id } }
        )
        .then(result => {
          console.log(result)
          res.json({
            message: "Success"
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })

    })
    .catch(err => {
      console.log(err)
    })
  }
    
  static downvote(req, res) {
    // 0. find the answer
    Answer.findOne({_id: req.params.answerId})
    .then(result => {
      // 1. check if it exists
      let condition = {$push: {downvote: req.body.user.id}}

      for (let i = 0; i < result.upvote.length; i++) {
        result.upvote[i] == req.body.user.id ? console.log(`ini sama!`) : console.log(`ini ga sama`)
        result.upvote[i] == req.body.user.id ? condition = {$pull: {downvote: req.body.user.id}} : null
      }

      Answer.update(
        { _id: req.params.answerId },
        condition
      )
      .then(result => {
        console.log(result)
        // 3. remove from  other key
        Answer.updateOne(
          { _id: req.params.answerId },
          { $pull: { upvote: req.body.user.id }}
        )
        .then(result => {
          console.log(result)
          res.json({
            message: "Success"
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

module.exports = AnswerController;