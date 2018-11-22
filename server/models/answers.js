require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect(process.env.MLAB, { useNewUrlParser: true })

const AnswerSchema = new Schema ({
  content: {
    type: String
  },
  writer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "We need your user id"]
  },
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

const Answer = mongoose.model('Answer', AnswerSchema)

module.exports = Answer
