const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema ({
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  question: {type: Schema.Types.ObjectId, ref: 'Question'},
  answer_body: String,
  createdAt: {type: Date, default: new Date()},
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer