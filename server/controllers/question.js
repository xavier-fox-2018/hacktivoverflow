const axios = require("axios"),
  jwt = require("jsonwebtoken"),
  ObjectId = require("mongodb").ObjectId,
  bcrypt = require("bcrypt"),
  Question = require("../models/question"),
  Joi = require("joi"),
  Verifier = require("email-verifier");

require("dotenv").config();

class QuestionController {

  static create(req, res) {
    // console.log(req.body.user)
    const inp = req.body
    const newQuestion = new Question({
      title: inp.title,
      content: inp.content,
      userId: ObjectId(inp.user.id),
      created: new Date(),
      answers: [],
      votes: []
    });

    newQuestion.save()
      .then(result => {
        res.status(201).json({
          message: "New question created",
          data: result
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: "Database error",
          data: err
        })
      })
  }

  static findAll(req, res) {
    Question.find()
      .populate('userId')
      .populate('answers')
      .exec((err, questions) => {
        if (err) {
          res.status(500).json({
            message: 'Database error',
            data: err
          })
        } else {
          res.json({
            message: "Success",
            data: questions
          })
        }
      })
  }

  static findOne(req, res) {
    // Question.findById(req.params.questionId, (err, question) => {
    //   // err ? console.log(err) : console.log(question)
    //   if (err) {}
    //   else {
    //     res.json({
    //       message: "Success",
    //       data: question
    //     })
    //   }
    // })

    Question.findOne({ _id: req.params.questionId })
      .populate("userId")
      .populate({
        path: "answers",
        populate: {path: "userId"}
      })
      .exec((err, question) => {
        if (err) {
        } else {
          res.json({ message: "Success", data: question });
        }
      });
  }
}

module.exports = QuestionController