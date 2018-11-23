const Question = require("../models/question")
const Answer = require("../models/answer")

module.exports = {

  findAll: function (req,res) {
    Question.find()
    .sort([['createdAt', 'descending']])
    .populate('postBy')
    .then((questions) => {
      res.status(200).json({
        questions,
        message: `Questions found`
      })
    })
    .catch((err) => {
      res.status(400).json({
        err,
        message: `Questions cannot found`
      })
    })
  },

  findOne: function (req,res) {
   
    Question.findById(req.params.id)
    .populate("postBy")
    .populate({path : 'answers', populate : {path : 'answerBy'}})
    .then((questions) => {
      res.status(201).json({
        questions
      })
    })
    .catch((err) => {
      res.status(200).json({
        err
      })
    })
  
  },

  findMyQuestions: function (req,res) {
    Question.find({postBy : req.userId})
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  create: function (req,res) {
    
    let dataQuestion = new Question ({
      title: req.body.title,
      description: req.body.description,
      postBy: req.userId
    })

    dataQuestion.save()
    .then((question) => {
      res.status(201).json({
        question,
        message: `create ${question.title} success`
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `create question failed`
      })
    })

  },

  update: function (req, res) {

    Question.update(
      { _id : req.params.id },
      {
        title : req.body.title,
        description : req.body.description
      },
      { runValidators: true }
    )
    .then((question) => {
      res.status(201).json({
        question,
        message: `updated question success`  
      })
    })
    .catch((err) => {
      res.status(500).json({
        err,
        message: `updated question failed`  
      })
    })

  },

  remove: function (req, res) {

    Question.findByIdAndDelete(req.params.id)
      .then(question => {
        Answer.deleteMany({ _id: { $in: question.answers } })
          .then(result => {})
          .catch(err => {});

        res.status(201).json({
          question,
          message: `delete ${question.title} success`
        });
      })
      .catch(err => {
        res.status(404).json({ err });
      });
  },

  upvote: function (req,res) {

    Question.findById(req.params.id)
    .populate(
      { path: 'upvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (question) {
      if(question.upvote.length === 0){
        Question.update( { _id: req.params.id },
          { $push: { upvote: req.userId } })
          .then(function () {
            Question.update( { _id: req.params.id },
              { $pull: { downvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  question,
                  message: `upvote success`
                })
              })
          })
      } else {
        res.status(500).json({
          message: `you can't upvote again`
        })
      }
    })

  },

  downvote: function (req,res) {

    Question.findById(req.params.id)
    .populate(
      { path: 'downvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (question) {
      if(question.downvote.length === 0){
        Question.findByIdAndUpdate(req.params.id,
          { $push: { downvote: req.userId } })
          .then(function () {
            Question.findByIdAndUpdate(req.params.id,
              { $pull: { upvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  question,
                  message: `downvote success`
                })
              })
          })
          .catch(function(err) {
            res.status(500).json({
              message: `you can't downvote again`
            })
          })
      } else {
        res.status(500).json({
          message: `you can't downvote again`
        })
      }
    })

  },

  mostAnswer: function (req,res) {
    Question.find().sort({answers: -1}).limit(10)
    .populate('answers')
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  popularQuestions: function (req,res) {

    Question.find()
    .sort({upvote: -1}).limit(10)
    .populate('answers')
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })

  },

  searchQuestion: function(req,res){

    Question.find({title: new RegExp(req.query.title, 'i')})
    .sort([['createdAt', 'descending']])
    .populate('postBy')
    .then(function(questions){
        res.status(200).json({
          questions
        })
    })
  },

}

