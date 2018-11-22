require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })

const QuestionSchema = new Schema ({
  title: {
    type: String,
    required: [true, "Please input the title"]
  },
  content: {
    type: String,
    required: [true, "Please input your question"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "Cannot proceed without your user id"]
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  votes: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    value: {
      type: Number
    }
  }]
})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question
