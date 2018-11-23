const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: String,
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  created: Date,
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvote: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
