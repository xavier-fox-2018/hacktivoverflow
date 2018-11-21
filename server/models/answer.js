const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  created: Date,
  upvote: { type: Schema.Types.ObjectId, ref: "User" },
  downvote: { type: Schema.Types.ObjectId, ref: "User" }
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
