const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  question_body: String,
  createdAt: {type: Date, default: new Date()},
  upvotes: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvotes: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;